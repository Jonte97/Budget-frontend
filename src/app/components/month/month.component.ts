import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseApiService } from 'src/domain/core/base-api.service';
import { AddOutcomeForm } from 'src/domain/models/form/AddoutcomeForm';
import { OutcomeRequest as CreateOutcomeRequest } from 'src/domain/models/request-models/create-outcome-request';
import { Category } from 'src/domain/models/response-models/categories/categories-response';
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
  outcomes: Outcome[] = [];
  isLoading: boolean = false;
  activeMonth: string | null = null;

  constructor(
    private httpClient: BaseApiService,
    private categoryService: CategoryService,
    private outcomeService: OutcomeService,
    private monthService: MonthService) {
    this.activeMonth = this.monthService.getActiveMonth()?.id ?? '';
  }

  ngOnDestroy(): void {
    this.categorySub$?.unsubscribe();
    this.postOutcomeSub$?.unsubscribe();
    this.outcomeSub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategories()
    this.getOutcomes();
  }

  setActiveCategory(id: string) {
    console.log('emitted', id);
    this.activeCategory = id;
  }

  getOutcomes() {
    this.outcomeSub$ = this.outcomeService.getOutcomes().subscribe({
      next: (result) => {
        this.outcomes = result.outcomes;
      }
    });
  }

  getCategories() {
    this.categorySub$ = this.categoryService.getGeneralCategories().subscribe(
      (categories) => {
        this.categories = categories.categories;
      })
  }

  formSubmitted(outcomeForm: AddOutcomeForm) {


    if (!this.activeMonth) {
      console.log('nu gick det fel!', this.activeMonth)
      throw new Error();
    }

    const body = {
      amount: outcomeForm.amount,
      categoryId: this.activeCategory,
      name: outcomeForm.name,
      quickAdd: outcomeForm.quickAdd,
      monthId: this.activeMonth
    } as CreateOutcomeRequest;

    this.isLoading = true;

    this.postOutcomeSub$ = this.httpClient.post<CreateOutcomeRequest>('/outcomes', body).subscribe({
      next: () => {
        this.isLoading = false;
        this.getOutcomes();
      },
      error: () => {
        console.log('error in post')
        this.isLoading = false
      }
    })
  }
}

