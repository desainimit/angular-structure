import { error } from 'console';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { TokenService } from '@app/core/services/token.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedStatus) => {
      this.isLoggedIn = loggedStatus;
    });
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe(
        (res) => {
          if (res.success) {
            this.authService.setLoggedIn(false);
            this.tokenService.clearToken('accessToken');
            this.router.navigate(['/']);
            this.toastService.showSuccess(res.message);
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
      this.authService.setLoggedIn(true);
    }
  }
}
