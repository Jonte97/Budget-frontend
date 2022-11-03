import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, of, Subscription } from 'rxjs';
import { BaseApiService } from 'src/domain/core/base-api.service';
import { AddOutcomeForm } from 'src/domain/models/form/AddoutcomeForm';
import { OutcomeRequest as CreateOutcomeRequest } from 'src/domain/models/request-models/create-outcome-request';
import { Category } from 'src/domain/models/response-models/categories/categories-response';
import { Month } from 'src/domain/models/response-models/month/month-response';
import { Outcome } from 'src/domain/models/response-models/outcomes/outcome-response';
import { CategoryService } from 'src/domain/services/category.service';
import { MonthService } from 'src/domain/services/month.service';
import { OutcomeService } from 'src/domain/services/outcome.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
})
export class MonthComponent implements OnInit, OnDestroy {
  activeCategory: string | null = null;
  categories: Category[] = [];
  categorySub$: Subscription | null = null;
  postOutcomeSub$: Subscription | null = null;
  outcomeSub$: Subscription | null = null;
  outcomes: Outcome[] | null = null;
  isLoading: boolean = false;
  activeMonth: Month | null = null;

  constructor(
    private httpClient: BaseApiService,
    private categoryService: CategoryService,
    private outcomeService: OutcomeService,
    private monthService: MonthService) {
    this.activeMonth = this.monthService.getActiveMonth();
  }

  ngOnDestroy(): void {
    this.categorySub$?.unsubscribe();
    this.postOutcomeSub$?.unsubscribe();
    this.outcomeSub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.monthService.activeMonth.subscribe(
      {
        next: (month) => {
          if (month) {
            this.activeMonth = month;
            this.getNewOutcomes();
          }
        }
      }
    );
    this.getCategories()
  }

  public setActiveCategory(id: string): void {
    this.activeCategory = id;
  }


  public getNewOutcomes(): void {
    this.outcomeSub$ = this.monthService.activeMonth.pipe(
      concatMap(
        (month) => {
          this.activeMonth = month;
          if (month) {
            return this.outcomeService.getOutcomesForMonth(month.id)
          }
          return of(null);
        }
      ))
      .subscribe(
        {
          next: (outcomes) => {
            this.outcomes = outcomes;
          }
        }
      )
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

    const payload = {
      amount: outcomeForm.amount,
      categoryId: this.activeCategory,
      name: outcomeForm.name,
      quickAdd: outcomeForm.quickAdd,
      monthId: this.activeMonth.id
    } as CreateOutcomeRequest;

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

