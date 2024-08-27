import { inject, Injectable } from '@angular/core';
import { Router } from 'express';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  currentDate: Date = new Date();
  selectedTodo: Todo | null = null;  // Свойство для хранения выбранной задачи для редактирования
  private todosSubject = new BehaviorSubject<Todo[]>(this.loadTodos());   // Создание BehaviorSubject для хранения и управления списком задач
  todos$ = this.todosSubject.asObservable();  // Observable для предоставления списка задач другим компонентам

  get todoList(): Todo[] { // Геттер для получения текущего списка задач
    return this.todosSubject.getValue();
  }

  public loadTodos(): Todo[] { // Метод для загрузки задач из localStorage
    const storedTodos = localStorage.getItem('todoList');
    if (storedTodos) {
      return JSON.parse(storedTodos).map((todo: Todo) => {
        todo.createdAt = new Date(todo.createdAt);
        return todo;
      });
    }
    return [];
  }

  updateTodos(todos: Todo[]): void {  // Метод для обновления списка задач
    this.todosSubject.next(todos);
    localStorage.setItem('todoList', JSON.stringify(todos));
  }

  editTodo(todo: Todo): void { // Метод для установки текущей задачи для редактирования
    this.selectedTodo = { ...todo };
  }



  updateTodo(updatedTodo: Todo): void {  // Метод для обновления конкретной задачи в списке задач
    const index = this.todoList.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      this.todoList[index] = updatedTodo;
      this.saveTodos();
    }
  }

  deleteTodo(todo: Todo): void {
 
    const updatedTodos = this.todoList.filter((t) => t.id !== todo.id);
    this.updateTodos(updatedTodos);
  }

  sortTodosByDate(): void {  // Метод для сортировки задач по дате создания в порядке убывания
    const sortedTodos = [...this.todoList].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    this.updateTodos(sortedTodos);
  }

  saveTodos(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    this.todosSubject.next(this.todoList);
  }

  getTodoById(id: number): Todo | undefined {
    return this.todoList.find((todo) => todo.id === id);
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
