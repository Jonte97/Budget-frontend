import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '../core/base-api.service';
import { SessionStorageService } from '../core/session-storage.service';
import { MonthNames } from '../models/Constants/monthNames.enum';
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

  public getMonthByIdentifier(identifier: string): Observable<Month> {
    return this.httpClient.get<Month>(`/Month/getmonth/${identifier}`);
  }

  public setActiveMonth(month: Month): void {
    this.activeMonth.next(month);
    this.sessionStorageService.setValue<Month>(month, 'activeMonth');
  }

  public getActiveMonth(): Month | null {
    const value = this.activeMonth.getValue() ?? this.sessionStorageService.getValue<Month>('activeMonth');
    return value;
  }

  public getMonths(budgetplanid: string): Observable<GetMonthResponse> {
    return this.httpClient.get<GetMonthResponse>(`/Month/${budgetplanid}`)
      .pipe(
        map(
          (res) => { return res }
        ));
  }

  public createMonth(identifier: string): Observable<Month> {
    return this.httpClient.post<GetMonthResponse>(`/Month`, {
      name: this.getNameOfMonth(this.getMonthFromIdentifier(identifier)),
      identifier: identifier
    });
  }

  public createMonthIdentifierDecrement(identifier: string) {
    const month = this.getMonthFromIdentifier(identifier);
    const year = this.getYearFromIdentifier(identifier);

    let monthNumber = +month;
    let yearNumber = +year;

    if (monthNumber === 1) {
      yearNumber = yearNumber - 1;
      monthNumber = 12;

      return `${yearNumber}-${monthNumber}`;
    }
    monthNumber = monthNumber - 1;

    return `${yearNumber}-${monthNumber}`;
  }
  public createMonthIdentifierIncrement(identifier: string): string {

    const month = this.getMonthFromIdentifier(identifier);
    const year = this.getYearFromIdentifier(identifier);

    let monthNumber = +month;
    let yearNumber = +year;

    if (monthNumber === 12) {
      yearNumber = yearNumber + 1;
      monthNumber = 1;

      return `${yearNumber}-${monthNumber}`;
    }
    monthNumber = monthNumber + 1;
    return `${yearNumber}-${monthNumber}`;
  }

  private getYearFromIdentifier(identifier: string): string {
    const year = identifier.substring(0, 2);
    return year;
  }

  private getMonthFromIdentifier(identifier: string): string {
    const month = identifier.substring(identifier.indexOf('-') + 1);

    return month;
  }

  public getNameOfMonth(month: string): string {
    const key = +month;

    switch (key) {
      case 1:
        return MonthNames.Januari;
      case 2:
        return MonthNames.Februari;
      case 3:
        return MonthNames.Mars;
      case 4:
        return MonthNames.April;
      case 5:
        return MonthNames.Maj;
      case 6:
        return MonthNames.Juni;
      case 7:
        return MonthNames.Juli;
      case 8:
        return MonthNames.Augusti;
      case 9:
        return MonthNames.September;
      case 10:
        return MonthNames.Oktober;
      case 11:
        return MonthNames.November;
      case 12:
        return MonthNames.December;
      default:
        throw new Error('Could not resolve monthName.');
    }

  }
}
