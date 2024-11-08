import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css',
})
export class DatatableComponent {
  @Input() colDef!: any;
  @Input() rowData!: any;
}
