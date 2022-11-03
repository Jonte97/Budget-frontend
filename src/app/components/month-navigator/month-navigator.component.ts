import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { concatMap, map, Subscription } from 'rxjs';
import { MonthService } from 'src/domain/services/month.service';
import { BudgetplanService } from 'src/domain/services/budgetplan.service';
import { Month } from 'src/domain/models/response-models/month/month-response';

@Component({
  selector: 'app-month-navigator',
  templateUrl: './month-navigator.component.html'
})
export class MonthNavigatorComponent implements OnInit, OnDestroy {

  @Input() month: Month | null = null;
  @Output() newMonthSelected: EventEmitter<string> = new EventEmitter<string>();

  private budgetPlan: string | null = null;

  private createMonthSub$: Subscription | null = null;
  private budgetPlanSub$: Subscription | null = null;

  constructor(
    private monthService: MonthService,
    private budgetplanService: BudgetplanService
  ) { }


  ngOnDestroy(): void {
    this.createMonthSub$?.unsubscribe();
    this.budgetPlanSub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.month = this.monthService.getActiveMonth();
    this.budgetPlanSub$ = this.budgetplanService.getBudgetplan().subscribe(
      {
        next: (plan) => { this.budgetPlan = plan.id }
      }
    );
  }

  public getOrCreateMonth(increment: boolean): void {

    if (this.month && this.budgetPlan) {
      const newIdentifier = increment
        ? this.monthService.createMonthIdentifierIncrement(this.month.identifier)
        : this.monthService.createMonthIdentifierDecrement(this.month.identifier);

      this.createMonthSub$ = this.monthService.getMonthByIdentifier(
        newIdentifier,
      ).pipe(
        map(
          (month) => {
            if (month) {
              this.month = month;
              this.monthService.setActiveMonth(this.month);
              this.newMonthSelected.emit(month.id);
            }
            else {
              this.createMonth(newIdentifier);
            }
          }
        )
      ).subscribe();
    }
  }

  public createMonth(identifier: string): void {
    this.createMonthSub$ = this.monthService.createMonth(identifier).subscribe(
      {
        next: (month) => {
          if (month) {
            this.monthService.setActiveMonth(month);
          }
        }
      }
    );
  }

}
