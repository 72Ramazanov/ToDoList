import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../home/home.component'; 
import { TodoService } from '../../services/todo.service';
import {
  ActivatedRoute,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Router } from 'express';
import { HomeComponent } from '../home/home.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { MessageService, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadEvent } from 'primeng/fileupload';


@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [  FormsModule, RouterModule, InputTextareaModule, FileUploadModule, ToastModule, ],
  providers: [MessageService],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent {
  todoService = inject(TodoService);
  todoList = this.todoService.todoList;
  todo: Todo | undefined
  originalTodo: Todo | undefined;
  todoId: number | null = null;
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const todoId = Number(this.route.snapshot.paramMap.get('id'));
    this.todo = this.todoService.getTodoById(todoId);

    if (this.todo) {
      this.originalTodo = { ...this.todo };
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader(); // Создает новый объект FileReader для чтения содержимого файла

      reader.onload = (e: any) => {
        if (this.todo) {
          this.todo.urlImg = e.target.result; 
        }
      };

      reader.readAsDataURL(file); 
    }
      //Функция onFileSelected() предназначен для обработки выбора файла пользователем и отображения выбранного изображения.

  }

  updateTodo(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.todo); 
    }
  }

  cancel(): void {
    if (this.originalTodo && this.todo) {
      this.todo.text = this.originalTodo.text;
      this.todo.urlImg = this.originalTodo.urlImg;
    }
    // // Эта функция  для отменяет редактирования задачи и возвращает к оригинальному состоянию
  }






}
