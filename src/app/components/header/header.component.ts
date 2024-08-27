import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  http = inject(HttpClient);
  authService = inject(AuthService)

  ngOnInit(): void {
    
      this.authService.user$.subscribe(user => {
        if(user) {
          this.authService.currentUserSig.set({
            email: user.email!,
          })     
        } else {
          this.authService.currentUserSig.set(null)
        }
        console.log(this.authService.currentUserSig())
      })
      //подписываемся на поток данных текущего пользователя из сервиса авторизации
  }

  logout(): void {
    this.authService.logout()
  }

}
