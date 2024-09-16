import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { DatatableComponent } from './datatable/datatable.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionButtonComponent } from './cell-render/action-button/action-button.component';

@NgModule({
  declarations: [LoaderComponent, DatatableComponent, ActionButtonComponent],
  imports: [CommonModule, AgGridModule],
  exports: [LoaderComponent, DatatableComponent, ActionButtonComponent],
})
export class SharedModule {}
