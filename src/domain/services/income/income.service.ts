import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { BaseApiService } from 'src/domain/core/base-api.service';
import { SessionStorageService } from 'src/domain/core/session-storage.service';
import { IncomeRequest } from 'src/domain/models/request-models/income/income-request.model';
import { IncomeDTO } from 'src/domain/models/response-models/income/incomeDTO';



@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private httpClient: BaseApiService,
    private sessionStorageService: SessionStorageService,
  ) { }

  public createNewIncome(payload: IncomeRequest): Observable<string> {
    return this.httpClient.post<string>('/income/addincome', payload)
      .pipe(
        catchError(

          (error) => {
            console.log('we got error');
            throw error();
          })
      );
  }

  public deleteIncome(payload: string): Observable<string> {
    return this.httpClient.delete<string>('')
      .pipe(
        catchError(

          (error) => {
            console.log('we got error');
            throw error();
          })
      );
  }

  public getIncomesForMonth(monthId: string): Observable<IncomeDTO[] | null> {
    return this.httpClient.get<IncomeDTO[] | null>(`/income/${monthId}`).pipe(
      catchError(
        (error) => {
          console.log(error);
          if (error?.statusCode) {
            return of(null);
          }
          throw new Error('could not get incomes.');
        })
    );
  }

}