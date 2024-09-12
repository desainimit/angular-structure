import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [ LayoutsComponent, TopbarComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class LayoutsModule {}
