import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/domain/core/local-storage.service';
import { SessionStorageService } from 'src/domain/core/session-storage.service';
import { Household } from 'src/domain/models/storage-models/storageInterfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService) { }



  ngOnInit(): void {
    const hardcodedBudgetplanId = "a3415ec6-cc8a-48c1-a4a2-bd2465b30b48";
    this.localStorageService.setValue(hardcodedBudgetplanId, 'budgetplanId')
    const hardCodedHousehold = {
      guid: 'd4969796-e5d0-4790-8551-3ba75604b4fb'
    } as Household
    this.sessionStorageService.setValue(hardCodedHousehold, 'household')
  }
}
