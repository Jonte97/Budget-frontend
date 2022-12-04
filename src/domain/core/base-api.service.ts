import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(
    private httpClient: HttpClient,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    @Inject('environment') private environment: any) {
  }

  get<T>(url: string, asset?: boolean): Observable<T> {
    const budgetplanId = this.localStorageService.getValue<string>('budgetplanId') ?? '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-budgetplan': budgetplanId });
    const options = { headers }
    return this.httpClient.get(this.environment.apiBaseUrl + url, options).pipe(map((res) => res)) as Observable<T>;
  }

  post<T>(url: string, model: any): Observable<any> {
    const budgetplanId = this.localStorageService.getValue<string>('budgetplanId') ?? '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-budgetplan': budgetplanId });
    const options = { headers };
    const body = JSON.stringify(model);

    return this.httpClient.post(this.environment.apiBaseUrl + url, body, options) as Observable<any>;
  }

  put<T>(url: string, model: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    const body = JSON.stringify(model);

    return this.httpClient.put(this.environment.apiBaseUrl + url, body, options) as Observable<any>;
  }

  delete<T>(url: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.httpClient.delete(this.environment.apiBaseUrl + url, options) as Observable<any>;
  }
}
