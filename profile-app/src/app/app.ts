import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListComponent} from '../features/users/components/list/list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('profile-app');
}
