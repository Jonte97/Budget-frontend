import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  setValue<T>(item: T, name: string) {
    localStorage.setItem(name, JSON.stringify(item));
  }

  getValue<T>(name: string): T | null {
    const result = localStorage.getItem(name);
    console.log(result)
    if (result != null) {
      return JSON.parse(result);
    }
    return null;
  }

  clearStorage() {
    localStorage.clear();
  }
}
