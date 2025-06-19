import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskFilter } from 'src/app/enums/task-filter.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    public searchTerm: string = '';

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

  saveTask(title: string) {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      completed: false
    };

    this.tasks.push(newTask);
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
    let result = this.tasks;

    const normalize = (str: string) =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const term = normalize(this.searchTerm);

    if (this.filter === TaskFilter.Pending) {
        result = result.filter(task => !task.completed);
    } else if (this.filter === TaskFilter.Completed) {
        result = result.filter(task => task.completed);
    }

    if (this.searchTerm.trim()) {
        result = result.filter(task => normalize(task.title.toLowerCase()).includes(term));
    }

    return result;
  }
}
