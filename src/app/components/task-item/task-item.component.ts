import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;

  @Output() toggle = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  onToggle() {
    this.toggle.emit(this.task);
  }

  onRemove() {
    this.remove.emit(this.task);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
