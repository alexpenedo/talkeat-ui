import { LoginComponent } from './components/user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
