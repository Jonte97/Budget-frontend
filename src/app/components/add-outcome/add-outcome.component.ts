import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddOutcomeForm } from 'src/domain/models/form/AddoutcomeForm';

@Component({
  selector: 'app-add-outcome',
  templateUrl: './add-outcome.component.html',
})
export class AddOutcomeComponent implements OnInit {
  @Input() category!: string;
  @Output() emitFormValue: EventEmitter<AddOutcomeForm> = new EventEmitter()
  formgroup: FormGroup;
  amount = new FormControl('');
  name = new FormControl('');
  reoccour = new FormControl(false);
  addExpense = new FormControl(false);



  constructor() {
    this.formgroup = new FormGroup({
      amount: this.amount,
      name: this.name,
      reoccour: this.reoccour,
      addExpense: this.addExpense
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.formgroup.valid) {
      let outcome = this.formgroup.value as AddOutcomeForm;
      outcome.category = this.category;
      this.emitFormValue.emit(outcome)
    }
  }

}

