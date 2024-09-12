import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, OtpComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
],
})
export class AuthorizationModule {}
