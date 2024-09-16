import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { TokenService } from '@app/core/services/token.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css',
})
export class LayoutsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private ngxPermission: NgxPermissionsService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken('accessToken')) {
      this.authService.getRolePermissions().subscribe(
        (res) => {
          if (res.success) {
            const permissions = res.data.permissions;
            const role = res.data.role.name;

            this.ngxPermission.loadPermissions(permissions);
            this.ngxPermission.addPermission([role]);
          }
        },
        (error) => {
          if (error.error.message) {
            this.toastService.showError(error.error.message);
          } else {
            this.toastService.showError('Something went wrong');
          }
        }
      );
    } else {
      this.authService.setLoggedIn(false);
    }
  }
}
