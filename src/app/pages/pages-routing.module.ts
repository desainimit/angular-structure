import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { ngxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'getUsers',
    component: UserManagementComponent,
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin', 'read_user'],
        redirectTo: '/',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
