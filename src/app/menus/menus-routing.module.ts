import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyMenusComponent} from './components/my-menus/my-menus.component';
import {AuthGuardService} from '../users/services/user/auth-guard.service';
import {CreateEditMenuComponent} from './components/create-menu/create-edit-menu.component';


const routes: Routes = [
  {
    path: 'menus', canActivate: [AuthGuardService],
    children: [
      {path: '', component: MyMenusComponent},
      {path: 'create', component: CreateEditMenuComponent},
      {path: 'edit/:id', component: CreateEditMenuComponent},
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

export class MenusRoutingModule {
}
