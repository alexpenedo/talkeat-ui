import { UserService } from './services/user/user.service';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
import { BookingComponent } from './components/booking/booking.component';
import { CreateMenuComponent } from './components/menu/create-menu/create-menu.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { MenuMarkerComponent } from './components/menu/menu-marker/menu-marker.component';
import { ChatComponent } from './components/chat/chat/chat.component';

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
    BookingComponent,
    MenuMarkerComponent,
    ChatComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    HttpModule,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDI4nEy33luOLXI2AZcRllmEdMq9mrWF_g',
      libraries: ["places"]
    }),
    AgmSnazzyInfoWindowModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [UserService, GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
