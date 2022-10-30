import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseApiService } from 'src/domain/core/base-api.service';
import { Outcome } from 'src/domain/models/response-models/outcomes/outcome-response';

@Component({
  selector: 'app-outcome-item',
  templateUrl: './outcome-item.component.html',
})
export class OutcomeItemComponent implements OnInit {
  @Input() outcome!: Outcome;
  editMode: boolean = false;

  outcomeSub$: Subscription | null = null;
  @Output() deleteOutcome: EventEmitter<string> = new EventEmitter();
  @Output() saveOutcome: EventEmitter<string> = new EventEmitter();
  constructor(
    private baseApiService: BaseApiService
  ) { }

  ngOnInit(): void {
  }

  edit() {
    this.editMode = true;
  }
  save() {
    this.editMode = false;
    console.log('new value is ', this.outcome.amount)
    this.outcomeSub$ = this.baseApiService.put(`/outcomes/${this.outcome.id}`, this.outcome).subscribe(
      () => {
        this.deleteOutcome.emit();
      }
    );
    this.saveOutcome.emit(this.outcome.id);
  }
  deleteItem() {
    console.log('doing stuff')
    this.outcomeSub$ = this.baseApiService.delete(`/outcomes/${this.outcome.id}`).subscribe(
      () => {
        this.deleteOutcome.emit();
      }
    );

  }
}

