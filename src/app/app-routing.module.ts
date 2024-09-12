import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
  {
    path:"auth",
    loadChildren:() => import("@authentication/authorization.module").then((m) => m.AuthorizationModule),
  },
  {
    path: '',
    component: LayoutsComponent,
    loadChildren: () =>
      import('@layouts/layouts.module').then((m) => m.LayoutsModule),
  },
  {
    path: '**',
    redirectTo: "/",
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
