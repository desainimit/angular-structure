import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SharedService } from '../../core/services/shared.service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onMenuClick() {
    this.sharedService.toggleMenu();
  }

  async onLogout() {
    const confirm = await this.sharedService.confirm(
      'Logout',
      'Are you sure you want to logout?'
    );

    if (confirm) {
      this.isLoading = true;
      this.authService.logout().subscribe({
        next: (res: any) => {
          if (res.status) {
            this.router.navigate(['/auth/login']);
            this.toastService.showSuccess(res.message);
            this.isLoading = false;
          }
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
