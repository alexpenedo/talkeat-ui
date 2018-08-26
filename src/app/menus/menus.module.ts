import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateEditMenuComponent} from './components/create-menu/create-edit-menu.component';
import {AddDishesComponent} from './components/add-dishes/add-dishes.component';
import {MyMenusComponent} from './components/my-menus/my-menus.component';
import {HostMenuInfoComponent} from './components/host-menu-info/host-menu-info.component';
import {HeaderMenuInfoComponent} from './components/header-menu-info/header-menu-info.component';
import {AddressDishsInfoComponent} from './components/address-dishs-info/address-dishs-info.component';
import {ConfirmDialogComponent} from '../common/dialogs/confirm-dialog/confirm-dialog.component';
import {MenuService} from './services/menu/menu.service';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatTabsModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersModule} from '../users/users.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RatingsModule} from '../ratings/ratings.module';
import {RatingModule} from 'ngx-rating';
import {MenuCardModule} from '../menu-card/menu-card.module';
import {MenusRoutingModule} from './menus-routing.module';

@NgModule({
  imports: [
    MenusRoutingModule,
    CommonModule,
    MatStepperModule,
    HttpClientModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RatingModule,
    InfiniteScrollModule,
    UsersModule,
    MenuCardModule,
    RatingsModule,
  ],
  declarations: [CreateEditMenuComponent,
    AddDishesComponent, MyMenusComponent,
    AddressDishsInfoComponent,
    HostMenuInfoComponent, HeaderMenuInfoComponent],
  providers: [MenuService],
  entryComponents: [ConfirmDialogComponent],
  exports: [HeaderMenuInfoComponent, AddressDishsInfoComponent]
})
export class MenusModule {
}
