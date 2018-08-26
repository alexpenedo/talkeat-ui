import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../users/services/user/auth-guard.service';
import {CreateRateComponent} from './components/create-rate/create-rate.component';

const routes: Routes = [
  {
    path: 'ratings', canActivate: [AuthGuardService],
    children: [
      {path: ':id', component: CreateRateComponent},
      {path: ':id/guest/:guest', component: CreateRateComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})

export class RatingsRoutingModule {
}
