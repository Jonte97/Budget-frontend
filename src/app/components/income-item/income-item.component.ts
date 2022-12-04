import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseApiService } from 'src/domain/core/base-api.service';
import { IncomeDTO } from 'src/domain/models/response-models/income/incomeDTO';

interface IncomeForm {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-income-item',
  templateUrl: './income-item.component.html',
})
export class IncomeItemComponent implements OnInit {

  @Input() incomeDTO!: IncomeDTO;
  @Output() deleteIncomeDTO: EventEmitter<string> = new EventEmitter();
  @Output() saveincomeDTO: EventEmitter<string> = new EventEmitter();
  editMode: boolean = false;
  public form: FormGroup | null = null;

  incomeDTOSub$: Subscription | null = null;
  constructor(
    private baseApiService: BaseApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl<string>(this.incomeDTO.name, Validators.required),
      amount: new FormControl<number>(this.incomeDTO.amount, Validators.required)
    })
  }

  public editToggle() {
    this.editMode = !this.editMode;
  }

  public save() {
    const formValue = this.getFormValue();

    const payload: IncomeDTO = {
      amount: formValue.amount,
      name: formValue.name,
      id: this.incomeDTO.id,
      monthId: this.incomeDTO.monthId,
      reoccouring: this.incomeDTO.reoccouring
    };

    this.editMode = false;
    console.log(this.incomeDTO)
    this.incomeDTOSub$ = this.baseApiService.put(`/income/${this.incomeDTO.id}`, payload).subscribe({
      next: () => {
        this.saveincomeDTO.emit();
      }
    });
  }

  public deleteItem() {
    this.incomeDTOSub$ = this.baseApiService.delete(`/income/${this.incomeDTO.id}`).subscribe(
      () => {
        this.deleteIncomeDTO.emit();
      }
    );

  }

  private getFormValue(): IncomeForm {
    if (this.form!.valid) {
      const formValue: IncomeForm = this.form?.value;
      console.log(formValue);
      return formValue;
    }
    throw new Error('form not valid');
  }
}
