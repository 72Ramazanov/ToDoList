import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { response } from 'express';
import { updateProfile } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireBaseAuth = inject(Auth); // Инъекция зависимости для получения экземпляра Auth из Firebase
  user$ = user(this.fireBaseAuth) // Создание Observable, который отслеживает текущего аутентифицированного пользователя
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  constructor() { }

  register(email:string, password: string) {
    return from(createUserWithEmailAndPassword(this.fireBaseAuth, email, password))  // Вызывает функцию createUserWithEmailAndPassword для регистрации нового пользователя
  }


  login(email: string, password:string)  {
    return from(signInWithEmailAndPassword(this.fireBaseAuth, email, password)) // Вызывает функцию signInWithEmailAndPassword для аутентификации пользователя
  }

  logout(): Observable<void> {
    const promise = signOut(this.fireBaseAuth) // Вызывает функцию signOut для завершения сеанса пользователя и выхода из системы
    return from(promise) // Оборачивает Promise в Observable с помощью from, чтобы можно было подписаться на завершение операции
  }
}
