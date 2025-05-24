import { Component, OnInit } from '@angular/core';
import { TaskFilter } from 'src/app/enums/task-filter.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    try {
      const storedTasks = localStorage.getItem('tasks');
      this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error('An error occurred when trying to read localStorage.', error);
      this.tasks = [];
      alert('An error occurred when trying to read localStorage. The local storage is corrupted.');
    }
  }

  tasks: Task[] = [
    { id: 1, title: "Ir ao mercado", completed: false },
    { id: 2, title: "Pagar conta de luz", completed: false },
    { id: 3, title: "Lavar louça", completed: false },
  ]

  newTaskTitle: string = "";
  filter: TaskFilter = TaskFilter.All;
  TaskFilter = TaskFilter;

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.saveTasksToLocalStorage();
  }

  saveTask() {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title: this.newTaskTitle.trim(),
      completed: false
    };

    this.tasks.push(newTask);
    this.newTaskTitle = "";
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(taskToRemove: Task) {
    this.tasks = this.tasks.filter(task => task.id !== taskToRemove.id);
    this.saveTasksToLocalStorage();
  }

  get filteredTasks(): Task[] {
    switch (this.filter) {
      case TaskFilter.Pending:
        return this.tasks.filter(task => !task.completed);
      case TaskFilter.Completed:
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }
}

export interface Task {
  id: number,
  title: string,
  completed: boolean
}
