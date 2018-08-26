import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateRateComponent} from './components/create-rate/create-rate.component';
import {RateComponent} from './components/rate/rate.component';
import {RateListComponent} from './components/rate-list/rate-list.component';
import {RateService} from './services/rate/rate.service';
import {UsersModule} from '../users/users.module';
import {RatingModule} from 'ngx-rating';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {MenuCardModule} from '../menu-card/menu-card.module';
import {RatingsRoutingModule} from './ratings-routing.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    MatStepperModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    PerfectScrollbarModule,
    MatSelectModule,
    UsersModule,
    MenuCardModule,
    RatingsRoutingModule
  ],
  providers: [RateService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  declarations: [CreateRateComponent, RateComponent, RateListComponent],
  exports: [RateComponent, RateListComponent]
})
export class RatingsModule {
}
