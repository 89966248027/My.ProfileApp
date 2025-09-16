import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Store} from '../../store';
import {FormComponent} from '../form/form.component';

@Component({
  selector: 'app-list',
  imports: [FormComponent],
  templateUrl: './list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private store = inject(Store);

  data = this.store.users;
  count = this.store.count;

  showPopup = signal(false);

  openPopup() {
    this.showPopup.set(true);
  }

  closePopup() {
    this.showPopup.set(false);
  }

  remove(id: number) {
    this.store.removeUser(id);
  }
}
