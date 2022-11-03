import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, map, mergeMap, Observable, Subscription, switchMap, tap } from 'rxjs';
import { BaseApiService as BaseApiService } from 'src/domain/core/base-api.service';
import { SessionStorageService } from 'src/domain/core/session-storage.service';
import { GetBudgetPlanResponse } from 'src/domain/models/response-models/budgetplan-response';
import { GetMonthResponse } from 'src/domain/models/response-models/month/month-response';
import { Household } from 'src/domain/models/storage-models/storageInterfaces';
import { BudgetplanService } from 'src/domain/services/budgetplan.service';
import { MonthService } from 'src/domain/services/month.service';

@Component({
  selector: 'app-budgetplan',
  templateUrl: './budgetplan.component.html',
})
export class BudgetplanComponent implements OnInit, OnDestroy {
  household: Household | null = null;
  monthSub$: Subscription | null = null;
  budgetplanSub$: Subscription | null = null;
  budgetplanObservable: Observable<GetBudgetPlanResponse>;
  budgetplanId: string;
  public months: GetMonthResponse | null = null;


  constructor(
    private monthService: MonthService,
    private budgetplanService: BudgetplanService,
    private router: Router,
  ) {
    this.budgetplanId = '';
    this.budgetplanObservable = this.budgetplanService.getBudgetplan()
  }
  ngOnDestroy(): void {
    this.monthSub$?.unsubscribe()
  }

  ngOnInit(): void {
    this.monthSub$ = this.getMonths().subscribe();
  }

  getMonths(): Observable<GetMonthResponse> {
    return this.budgetplanObservable.pipe(
      map((res) => {
        this.budgetplanId = res.id;
      }),
      concatMap(() => {
        return this.monthService.getMonths(this.budgetplanId)
          .pipe(
            map((result) => {
              this.months = result
              return result
            })
          )
      }))
  }
  
  public navigate(id: string) {
    const month = this.months?.months.find((m) => m.id === id)

    if (month) {
      this.monthService.setActiveMonth(month);
      this.router.navigate(['month/' + this.monthService.getActiveMonth()?.name]);
    }
  }
  // public addMonth() {
  //   this.httpClient.post('/Month/post', {}).subscribe();
  // }
}

