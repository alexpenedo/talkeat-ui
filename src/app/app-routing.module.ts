import {AuthGuardService} from './services/user/auth-guard.service';
import {ProfileComponent} from './components/user/profile/profile.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/user/register/register.component';
import {CreateEditMenuComponent} from './components/menu/create-menu/create-edit-menu.component';
import {CreateBookingComponent} from './components/booking/create-booking/create-booking.component';
import {MyBookingsComponent} from './components/booking/my-bookings/my-bookings.component';
import {BookingRateComponent} from './components/rate/booking-rate/booking-rate.component';
import {MyMenusComponent} from './components/menu/my-menus/my-menus.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-menu', component: CreateEditMenuComponent},
  {path: 'edit-menu/:id', component: CreateEditMenuComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuardService]},
  {path: 'my-menus', component: MyMenusComponent, canActivate: [AuthGuardService]},
  {path: 'booking/:id', component: CreateBookingComponent, canActivate: [AuthGuardService]},
  {path: 'rating/:id', component: BookingRateComponent, canActivate: [AuthGuardService]},
  // {path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
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
