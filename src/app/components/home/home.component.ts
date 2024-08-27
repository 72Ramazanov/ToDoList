import { TodoService } from './../../services/todo.service';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DatePipe, NgFor, JsonPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FieldsetModule } from 'primeng/fieldset';
import { MenubarModule } from 'primeng/menubar';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, HeaderComponent,
    DatePipe,
    FormsModule,
    NgFor,
    JsonPipe,
    FieldsetModule,
    NgIf,
    AddTodoComponent,
    EditTodoComponent,
    MatIconModule, MenubarModule,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  todoList: Todo[] = [];
  router = inject(Router)
  todoService = inject(TodoService)
  selectedTodo = this.todoService.selectedTodo
  authService = inject(AuthService)
  http = inject(HttpClient);

  

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todoList = todos;
    });
    
  }


  editTodo(todo: Todo) {
    this.selectedTodo = { ...todo };
    this.router.navigate(['/edit', todo.id]);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }


  
}



export class Todo {
  constructor(
    public id: number,
    public text: string,
    public urlImg?: string,
    public createdAt: Date = new Date()
  ) {}
}