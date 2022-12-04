import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { concatMap, map, Observable, Subscription } from 'rxjs';
import { IncomeDTO } from 'src/domain/models/response-models/income/incomeDTO';
import { IncomeService } from 'src/domain/services/income/income.service';
import { MonthService } from 'src/domain/services/month/month.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html'
})
export class IncomeListComponent implements OnInit, OnDestroy {

  @Input() incomes: IncomeDTO[] | null = null;
  @Output() getNewIncomes: EventEmitter<void> = new EventEmitter();

  private incomeSub$: Subscription | null = null;

  constructor(
    private incomeService: IncomeService,
    private monthService: MonthService
  ) { }

  ngOnDestroy(): void {
    this.incomeSub$?.unsubscribe();
  }

  ngOnInit(): void {
    this.incomeSub$ = this.getIncomes().subscribe();
  }

  public getIncomesSub(): void {
    this.getNewIncomes.emit();
  }

  public getIncomes(): Observable<void> {
    return this.monthService.activeMonth.pipe(
      concatMap(
        (month) => {
          if (!month) {
            month = this.monthService.getActiveMonth();
          }
          return this.incomeService.getIncomesForMonth(month!.id).pipe(
            map(
              (incomes) => {
                if (incomes) {
                }
                this.incomes = incomes;

              })
          )
        })
    );
  }

}
