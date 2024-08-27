import  EditorJS  from '@editorjs/editorjs';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
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
  }

  logout(): void {
    this.authService.logout()
  }


}
