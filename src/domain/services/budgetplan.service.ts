import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../core/base-api.service';
import { SessionStorageService } from '../core/session-storage.service';
import { GetBudgetPlanResponse } from '../models/response-models/budgetplan-response';
import { Household } from '../models/storage-models/storageInterfaces';

@Injectable({
  providedIn: 'root'
})
export class BudgetplanService {

  constructor(
    private httpClient: BaseApiService,
    private sessionStorageService: SessionStorageService
  ) { }

  getBudgetplan(): Observable<GetBudgetPlanResponse> {
    const householdId = this.sessionStorageService.getValue<Household>('household');
    return this.httpClient.get(`/Budgetplan/${householdId?.guid}`);
  }
}
