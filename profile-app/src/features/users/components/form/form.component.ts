import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '../../store';
import {User} from '../../models';

interface Form {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
}

function mapFormToModel(form: FormGroup<Form>): User {
  const valueForm = form.value;

  return {
    id: 0,
    name: valueForm.name ?? '',
    email: valueForm.email ?? '',
    age: valueForm.age ?? null,
  }
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  private store = inject(Store);

  @Output() closePopup = new EventEmitter<void>();

  form = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    age: new FormControl<number | null>(null, {validators: [Validators.min(1)]})
  });

  save() {
    if (this.form.valid) {
      this.store.addUser(mapFormToModel(this.form));
      this.form.reset();
      this.closePopup.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
