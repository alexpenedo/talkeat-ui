import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatTabsModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookingInfoComponent} from './components/booking-info/booking-info.component';
import {CreateBookingComponent} from './components/create-booking/create-booking.component';
import {MyBookingsComponent} from './components/my-bookings/my-bookings.component';
import {MenusModule} from '../menus/menus.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RatingsModule} from '../ratings/ratings.module';
import {AppRoutingModule} from '../app-routing.module';
import {MenuCardModule} from '../menu-card/menu-card.module';
import {BookingsRoutingModule} from './bookings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatStepperModule,
    HttpClientModule,
    MatChipsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    InfiniteScrollModule,
    MenusModule,
    MenuCardModule,
    RatingsModule,
    BookingsRoutingModule
  ],
  declarations: [BookingInfoComponent, CreateBookingComponent, MyBookingsComponent],
  exports: [BookingInfoComponent]
})
export class BookingsModule {
}
