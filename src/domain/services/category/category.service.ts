import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../core/base-api.service';
import { SessionStorageService } from '../../core/session-storage.service';
import { Category, CategoryResponse } from '../../models/response-models/categories/categories-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: BaseApiService,
    private sessionStorageService: SessionStorageService) { }

  getGeneralCategories(): Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>('/categories');
  }

}
