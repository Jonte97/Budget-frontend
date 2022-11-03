import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Outcome } from 'src/domain/models/response-models/outcomes/outcome-response';

@Component({
  selector: 'app-outcome-list',
  templateUrl: './outcome-list.component.html',
})
export class OutcomeListComponent implements OnInit, OnChanges {
  @Input() outcomes: Outcome[] = [];
  @Input() activeCategory: string | null = null;
  @Output() outcomeUpdate: EventEmitter<void> = new EventEmitter();
  displayedOutcomes: Outcome[] = [];

  private settings: Settings = { showAll: false };


  constructor() {
  }
  ngOnChanges() {
    this.updateList()
  }

  ngOnInit(): void {
    this.displayedOutcomes = this.outcomes;
    this.updateList();
  }

  public toggleFilter() {
    this.settings.showAll = !this.settings.showAll;
    this.updateList();
  }

  public updateList() {
    if (this.settings.showAll === true) {
      this.displayedOutcomes = this.outcomes;
    }
    else {
      this.displayedOutcomes = this.outcomes.filter(
        (obj) => obj.categoryId === this.activeCategory)
    }
  }
}

interface Settings {
  showAll: boolean;
}