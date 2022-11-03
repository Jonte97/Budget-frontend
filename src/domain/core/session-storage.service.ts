import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() { }

  setValue<T>(item: T, name: string) {
    sessionStorage.setItem(name, JSON.stringify(item));
  }

  getValue<T>(name: string): T | null {
    const result = sessionStorage.getItem(name);
    if (result != null) {
      return JSON.parse(result);
    }
    return null;
  }

  clearStorage() {
    sessionStorage.clear();
  }
}
