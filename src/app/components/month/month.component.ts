import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, of, Subscription } from 'rxjs';
import { BaseApiService } from 'src/domain/core/base-api.service';
import { AddOutcomeForm } from 'src/domain/models/form/AddoutcomeForm';
import { OutcomeRequest as CreateOutcomeRequest } from 'src/domain/models/request-models/create-outcome-request';
import { Category } from 'src/domain/models/response-models/categories/categories-response';
import { IncomeDTO } from 'src/domain/models/response-models/income/incomeDTO';
import { Month } from 'src/domain/models/response-models/month/month-response';
import { Outcome } from 'src/domain/models/response-models/outcomes/outcome-response';
import { CategoryService } from 'src/domain/services/category/category.service';
import { IncomeService } from 'src/domain/services/income/income.service';
import { MonthService } from 'src/domain/services/month/month.service';
import { OutcomeService } from 'src/domain/services/outcome/outcome.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
})
export class MonthComponent implements OnInit, OnDestroy {
  activeCategory: string | null = null;
  categories: Category[] = [];
  activeMonth: Month | null = null;

  public isLoading: boolean = false;
  public outcomes: Outcome[] | null = null;
  public incomes: IncomeDTO[] | null = null;

  private outcomeSub$: Subscription | null = null;
  private categorySub$: Subscription | null = null;
  private postOutcomeSub$: Subscription | null = null;
  private incomeSub$: Subscription | null = null;

  constructor(
    private httpClient: BaseApiService,
    private categoryService: CategoryService,
    private outcomeService: OutcomeService,
    private monthService: MonthService,
    private incomeService: IncomeService) {
    this.activeMonth = this.monthService.getActiveMonth();
  }

  ngOnDestroy(): void {
    this.categorySub$?.unsubscribe();
    this.postOutcomeSub$?.unsubscribe();
    this.outcomeSub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getNewOutcomes();
  }

  public setActiveCategory(id: string): void {
    this.activeCategory = id;
  }

  public getIncomes(): void {
    const month = this.monthService.getActiveMonth();
    if (month) {
      this.incomeSub$ = this.incomeService.getIncomesForMonth(month.id).subscribe({
        next: (incomes) => {
          this.incomes = incomes;
        }
      });
    }
  }

  public getNewOutcomes(): void {
    const month = this.monthService.getActiveMonth();
    if (month) {
      this.outcomeSub$ = this.outcomeService.getOutcomesForMonth(month.id).subscribe({
        next: (outcomes) => {
          this.outcomes = outcomes
        }
      });
    }
  }

  private getCategories(): void {
    this.categorySub$ = this.categoryService.getGeneralCategories().subscribe(
      (categories) => {
        this.categories = categories.categories;
      })
  }

  public formSubmitted(outcomeForm: AddOutcomeForm): void {

    if (!this.activeMonth) {
      console.log('nu gick det fel!', this.activeMonth)
      throw new Error();
    }

    const payload: CreateOutcomeRequest = {
      amount: outcomeForm.amount,
      categoryId: this.activeCategory!,
      name: outcomeForm.name,
      quickAdd: outcomeForm.quickAdd,
      monthId: this.activeMonth.id,
      reoccouring: outcomeForm.reocour
    };

    this.isLoading = true;

    this.postOutcomeSub$ = this.httpClient.post<CreateOutcomeRequest>('/outcomes', payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.getNewOutcomes();
      },
      error: () => {
        console.log('error in post')
        this.isLoading = false
      }
    });
  }
}

