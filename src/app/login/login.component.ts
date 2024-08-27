import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, RouterLink],
})
export class LogicComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService)


  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    //form = this.fb.nonNullable.group({ ... });: Создает реактивную форму с использованием FormBuilder. nonNullable указывает, что значения полей формы не могут быть null или undefined.
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
      this.router.navigateByUrl('/')
      }, 
      error: (err) => {
        this.errorMessage = err.code
      }
    })
  }
}
