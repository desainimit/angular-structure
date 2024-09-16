import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '@app/core/services/admin-service.service';
import { ToastService } from '@app/core/services/toast.service';
import { ActionButtonComponent } from '@app/shared/cell-render/action-button/action-button.component';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent {
  rowData!: any;
  colDef: ColDef[] = [
    { headerName: 'Sr No', valueGetter: 'node.rowIndex + 1', flex: 0.5, rowDrag: true, },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'fullName', flex: 1 },
    { field: 'email', flex: 1 },
    {
      field: 'isLoggedIn',
      headerName: 'Log Status',
      flex: 1,
      cellRenderer: (params: any) => {
        if (params.value === true) {
          return `<span class="badge badge-pill badge-success" style="background-color: #28a745; color: white;">Logged In</span>`;
        } else {
          return `<span class="badge badge-pill badge-secondary" style="background-color: #6c757d; color: white;">Logged Out</span>`;
        }
      },
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      cellRenderer: (params: any) => {
        if (params.value === 'admin') {
          return `<span class="badge badge-pill badge-primary" style="background-color: #007bff; color: white;">Admin</span>`;
        } else {
          return `<span class="badge badge-pill badge-secondary" style="background-color: #6c757d; color: white;">User</span>`;
        }
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      cellRenderer: ActionButtonComponent,
      cellRendererParams: {
        onView: (id: string) => this.viewUser(id),
        onEdit: (id: string) => this.editUser(id),
        onDelete: (id: string) => this.deleteUser(id),
      },
    },
  ];

  constructor(
    private adminService: AdminServiceService,
    private toast: ToastService,
    private router: Router
  ) {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getAllUsers().subscribe(
      (res) => {
        if (res.success) {
          this.rowData = res.data;
        }
      },
      (error) => {
        if (error.status === 403) {
          this.toast.showError('Please Login to continue');
        } else {
          this.toast.showError(error.error.message);
        }
      }
    );
  }

  viewUser(id: string) {
    console.log(id);
  }

  editUser(id: string) {
    console.log(id);
  }

  deleteUser(id: string) {
    console.log(id);
  }
}
