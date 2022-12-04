import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IncomeForm } from 'src/domain/models/form/IncomeForm.model';
import { IncomeRequest } from 'src/domain/models/request-models/income/income-request.model';
import { IncomeService } from 'src/domain/services/income/income.service';
import { MonthService } from 'src/domain/services/month/month.service';

@Component({
  selector: 'app-income-section',
  templateUrl: './income-section.component.html'
})
export class IncomeSectionComponent implements OnInit, OnDestroy {

  @Output() createIncome: EventEmitter<void> = new EventEmitter();
  private activeMonth$: Subscription | null = null;
  private incomeSub$: Subscription | null = null;
  private createIncomeSub$: Subscription | null = null;

  public incomeForm: FormGroup | null = null;


  constructor(
    private incomeService: IncomeService,
    private monthService: MonthService
  ) {

  }

  ngOnDestroy(): void {
    this.activeMonth$?.unsubscribe();
    this.incomeSub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.setActiveMonth();
    this.initializeForm();
  }

  //FORM
  private initializeForm(): void {
    this.incomeForm = new FormGroup({
      amount: new FormControl<number>(0, Validators.required),
      category: new FormControl<string>('', Validators.required),
      name: new FormControl<string>('', Validators.required),
      reoccouring: new FormControl<boolean>(false, Validators.required),
    });
  }

  private setActiveMonth(): void {
    this.activeMonth$ = this.monthService.activeMonth.subscribe();
  }

  public submit() {
    if (this.incomeForm?.valid) {
      const form: IncomeForm = this.incomeForm.value;
      const month = this.monthService.getActiveMonth();
      if (!month) {
        throw new Error('no active month.');
      }
      const payload: IncomeRequest = {
        amount: form.amount,
        category: form.category,
        monthId: month.id,
        name: form.name,
        reoccouring: form.reoccouring
      };

      this.createIncomeSub$ = this.incomeService.createNewIncome(payload).subscribe({
        next: (income) => {
          this.createIncome.emit();
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
        }
      });

    }
  }

}
