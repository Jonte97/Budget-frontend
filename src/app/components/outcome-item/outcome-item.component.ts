import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseApiService } from 'src/domain/core/base-api.service';
import { Outcome } from 'src/domain/models/response-models/outcomes/outcome-response';

interface OutcomeForm {
  name: FormControl<string | null>;
  amount: FormControl<number | null>;
  reoccouring: FormControl<boolean | null>;
}

@Component({
  selector: 'app-outcome-item',
  templateUrl: './outcome-item.component.html',
})
export class OutcomeItemComponent implements OnInit {
  @Input() outcome!: Outcome;

  @Output() deleteOutcome: EventEmitter<string> = new EventEmitter();
  @Output() saveOutcome: EventEmitter<string> = new EventEmitter();

  public editMode: boolean = false;

  public form: FormGroup<OutcomeForm> = this.formBuilder.group<OutcomeForm>({
    name: new FormControl<string | null>(null, Validators.required),
    amount: new FormControl<number | null>(null, { validators: [Validators.min(1), Validators.required] }),
    reoccouring: new FormControl<boolean | null>(false, { validators: [Validators.required] })
  });

  private outcomeSub$: Subscription | null = null;

  constructor(
    private baseApiService: BaseApiService,
    private formBuilder: FormBuilder
  ) {

  }



  ngOnInit(): void {
    this.setFormBaseValues();
  }

  private setFormBaseValues(): void {
    this.form.patchValue({
      name: this.outcome.name,
      amount: this.outcome.amount,
      reoccouring: this.outcome.reoccouring
    })
  }

  public toggleEdit() {
    this.editMode = !this.editMode;
  }

  public save(): void {
    if (!this.form!.valid)
      return;

    //ErrorMessage here
    console.log(this.form.controls.amount.value);
    console.log(this.form.controls.name.value);

    const payLoad: Outcome = {
      amount: this.form.value.amount!,
      categoryId: this.outcome.categoryId,
      id: this.outcome.id,
      monthId: this.outcome.monthId,
      name: this.form.value.name!,
      ownerId: this.outcome.ownerId,
      reoccouring: this.form.value.reoccouring!
    }

    this.editMode = false;
    this.outcomeSub$ = this.baseApiService.put(`/outcomes/${this.outcome.id}`, payLoad).subscribe({
      next: () => {
      },
      complete: () => {
        this.saveOutcome.emit();
      }
    });
    // this.saveOutcome.emit(this.outcome.id);
  }

  public deleteItem(): void {
    this.outcomeSub$ = this.baseApiService.delete(`/outcomes/${this.outcome.id}`).subscribe(
      () => {
        this.deleteOutcome.emit();
      }
    );

  }
}

