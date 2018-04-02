import { UserService } from './services/user/user.service';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { AppComponent } from './app.component';
import {
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
  MatIconModule,
  MatMenuModule,
  MatStepperModule,
  MatChipsModule,
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/user/login/login.component';
import { AddDishesComponent } from './components/menu/add-dishes/add-dishes.component';
import { AutofocusDirective } from './directives/autofocus/autofocus.directive';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserImageComponent } from './components/user/user-image/user-image.component';
import { MenuInfoComponent } from './components/menu/menu-info/menu-info.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { MapComponent } from './components/map/map.component';
import { CreateBookingComponent } from './components/booking/create-booking/create-booking.component';
import { CreateMenuComponent } from './components/menu/create-menu/create-menu.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { MenuMarkerComponent } from './components/menu/menu-marker/menu-marker.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { ChatButtonListComponent } from './components/chat/chat-button-list/chat-button-list.component';
import { ChatService } from './services/chat/chat.service';
import { MyBookingsComponent } from './components/booking/my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    HomeComponent,
    CreateMenuComponent,
    AddDishesComponent,
    AutofocusDirective,
    ProfileComponent,
    UserImageComponent,
    MenuInfoComponent,
    MapComponent,
    CreateBookingComponent,
    MenuMarkerComponent,
    ChatComponent,
    ChatButtonListComponent,
    MyBookingsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDI4nEy33luOLXI2AZcRllmEdMq9mrWF_g',
      libraries: ["places"],
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
    AgmSnazzyInfoWindowModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [UserService, GeolocationService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
