import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
//import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },*/
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

