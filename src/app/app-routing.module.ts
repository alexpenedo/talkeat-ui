import {AuthGuardService} from './users/services/user/auth-guard.service';
import {HomeComponent} from './home/components/home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: true}
    )
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})

export class AppRoutingModule {
}
