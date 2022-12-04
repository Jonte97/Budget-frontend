import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../core/base-api.service';
import { Outcome, OutComeResponse } from '../../models/response-models/outcomes/outcome-response';

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {

  constructor(private httpclient: BaseApiService) { }

  public getOutcomes(): Observable<OutComeResponse> {
    return this.httpclient.get<OutComeResponse>('/outcomes');
  }

  public getOutcomesForMonth(monthId: string): Observable<Outcome[]> {
    return this.httpclient.get<Outcome[]>(`/Outcomes/getAllOutcomesByMonth/${monthId}`);
  }
}

