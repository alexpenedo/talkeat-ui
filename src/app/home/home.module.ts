import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MenuCardModule} from '../menu-card/menu-card.module';
import {MapModule} from '../map/map.module';
import {MenusModule} from '../menus/menus.module';
import {HomeComponent} from './components/home/home.component';
import {Ng4GeoautocompleteModule} from 'ng4-geoautocomplete';
import {FormsModule} from '@angular/forms';
import {BookingsModule} from '../bookings/bookings.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    InfiniteScrollModule,
    MenuCardModule,
    MapModule,
    MatIconModule,
    Ng4GeoautocompleteModule.forRoot(),
    MenusModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {
}
