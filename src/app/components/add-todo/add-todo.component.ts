import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Todo } from '../home/home.component'; 
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { Router } from 'express';
import { TodoService } from '../../services/todo.service';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ NgIf, FormsModule, RouterLink, RouterModule, InputTextareaModule, FileUploadModule, ToastModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  newTodoText: string = ''; //переменая сохраняет текст новой задачи
  newTodoImage: string | undefined = undefined; //переменая сохраняет фотографии новой задачи
  timeTodo: Date = new Date(); // Переменная для хранения времени создания новой задачи.
  todoService = inject(TodoService)
  todoList = this.todoService.todoList
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.newTodoImage = reader.result.toString();
        }
      };

      reader.readAsDataURL(file);
    }
  }
  //Функция onFileSelected() предназначен для обработки выбора файла пользователем и отображения выбранного изображения.

  addTodo(): void {
    if (this.newTodoText.trim() === '') return;

    const newTodo = new Todo(Date.now(), this.newTodoText, this.newTodoImage, this.timeTodo);
    this.todoList.push(newTodo)
    this.todoService.sortTodosByDate()
    this.todoService.saveTodos()

    // Очистка полей ввода после добавления задачи
    this.newTodoText = '';
    this.newTodoImage = undefined;

  }

  cancel(): void {

  }


}
