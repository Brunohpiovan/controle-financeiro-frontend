import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/menu/nav/nav.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path:'',
    component:NavComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate: [NoAuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
