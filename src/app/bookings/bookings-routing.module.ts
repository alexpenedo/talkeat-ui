import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../users/services/user/auth-guard.service';
import {MyBookingsComponent} from './components/my-bookings/my-bookings.component';
import {CreateBookingComponent} from './components/create-booking/create-booking.component';


const routes: Routes = [
  {
    path: 'bookings', canActivate: [AuthGuardService],
    children: [
      {path: '', component: MyBookingsComponent},
      {path: 'create/:menuId', component: CreateBookingComponent}
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

export class BookingsRoutingModule {
}
