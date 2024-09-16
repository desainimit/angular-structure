import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent implements ICellRendererAngularComp {
  params: any;
  constructor() {}

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;

  }

  refresh(): boolean {
    return true;
  }

  onEdit() {
    this.params.onEdit(this.params.data._id);
  }
  onView() {
    this.params.onView(this.params.data._id);
  }
  onDelete() {
    this.params.onDelete(this.params.data._id);
  }
}
