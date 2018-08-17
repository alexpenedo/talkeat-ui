import {UserService} from './services/user/user.service';
import {HomeComponent} from './components/home/home.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {RegisterComponent} from './components/user/register/register.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {AppComponent} from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/user/login/login.component';
import {AddDishesComponent} from './components/menu/add-dishes/add-dishes.component';
import {AutofocusDirective} from './directives/autofocus/autofocus.directive';
import {ProfileComponent} from './components/user/profile/profile.component';
import {UserImageComponent} from './components/user/user-image/user-image.component';
import {MenuInfoComponent} from './components/menu/menu-info/menu-info.component';
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {MapComponent} from './components/map/map.component';
import {CreateBookingComponent} from './components/booking/create-booking/create-booking.component';
import {CreateEditMenuComponent} from './components/menu/create-menu/create-edit-menu.component';
import {Ng4GeoautocompleteModule} from 'ng4-geoautocomplete';
import {GeolocationService} from './services/geolocation/geolocation.service';
import {ChatComponent} from './components/chat/chat/chat.component';
import {ChatButtonListComponent} from './components/chat/chat-button-list/chat-button-list.component';
import {ChatService} from './services/chat/chat.service';
import {UtilService} from './services/util/util.service';
import {MyBookingsComponent} from './components/booking/my-bookings/my-bookings.component';
import {BookingInfoComponent} from './components/booking/booking-info/booking-info.component';
import {RatingModule} from 'ngx-rating';
import {RateComponent} from './components/rate/rate/rate.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {HttpClientInterceptor} from './interceptors/httpInterceptor';
import {MyMenusComponent} from './components/menu/my-menus/my-menus.component';
import {HostMenuInfoComponent} from './components/menu/host-menu-info/host-menu-info.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ChatInfoComponent} from './components/chat/chat-info/chat-info.component';
import {RateListComponent} from './components/rate/rate-list/rate-list.component';
import {CreateRateComponent} from './components/rate/create-rate/create-rate.component';
import { AddressDishsInfoComponent } from './components/menu/address-dishs-info/address-dishs-info.component';
import { HeaderMenuInfoComponent } from './components/menu/header-menu-info/header-menu-info.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    HomeComponent,
    CreateEditMenuComponent,
    AddDishesComponent,
    AutofocusDirective,
    ProfileComponent,
    UserImageComponent,
    MenuInfoComponent,
    MapComponent,
    CreateBookingComponent,
    ChatComponent,
    ChatButtonListComponent,
    MyBookingsComponent,
    BookingInfoComponent,
    RateComponent,
    MyMenusComponent,
    HostMenuInfoComponent,
    ChatInfoComponent,
    RateListComponent,
    CreateRateComponent,
    AddressDishsInfoComponent,
    HeaderMenuInfoComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZdKZkDWl-ek6SDeqwfJtbZT3QiNrfVn4',
      libraries: ['places'],
      language: 'es',
      region: 'ES'
    }),
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    Ng4GeoautocompleteModule.forRoot(),
    RatingModule,
    PerfectScrollbarModule,
    InfiniteScrollModule,
    AgmJsMarkerClustererModule,
  ],
  providers: [UserService, GeolocationService, ChatService, UtilService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ChatInfoComponent, ConfirmDialogComponent]
})
export class AppModule {
}
