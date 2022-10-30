import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '../core/base-api.service';
import { SessionStorageService } from '../core/session-storage.service';
import { GetMonthResponse, Month } from '../models/response-models/month/month-response';
import { Household } from '../models/storage-models/storageInterfaces';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  public activeMonth: BehaviorSubject<Month | null> = new BehaviorSubject<Month | null>(null);
  constructor(
    private sessionStorageService: SessionStorageService,
    private httpClient: BaseApiService
  ) {
  }


  public setActiveMonth(month: Month) {
    this.sessionStorageService.setValue<Month>(month, 'activeMonth');
  }
  public getActiveMonth(): Month | null {
    return this.sessionStorageService.getValue<Month>('activeMonth')
  }

  getMonths(budgetplanid: string): Observable<GetMonthResponse> {
    return this.httpClient.get<GetMonthResponse>(`/Month/${budgetplanid}`)
      .pipe(
        map(
          (res) => { return res }
        ));
  }
}
