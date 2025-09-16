import {User} from '../models';
import {computed, effect, Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Store {
  private readonly _users = signal<User[]>([]);

  readonly users = this._users.asReadonly();
  readonly count = computed(() => this._users().length);

  constructor() {
    effect(() => {
      console.log('Изменение пользователей:', this._users());
    });
  }

  addUser(user: User) {
    const newUser: User = { ...user, id: Date.now() };
    this._users.update(users => [...users, newUser]);
  }

  removeUser(id: number) {
    this._users.update(users => users.filter(u => u.id !== id));
  }
}
