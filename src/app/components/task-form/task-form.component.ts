import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
    newTaskTitle: string = '';

    @Output() add = new EventEmitter<string>();

    constructor() { }

    onSubmit() {
        const trimmed = this.newTaskTitle.trim();
        if (!trimmed) return;

        this.add.emit(trimmed);
        this.newTaskTitle = '';
    }

}
