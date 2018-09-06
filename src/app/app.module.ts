import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {AppComponent} from './app.component';
import {UtilService} from './common/services/util/util.service';
import {HttpClientInterceptor} from './common/interceptors/httpInterceptor';
import {ToolbarModule} from './toolbar/toolbar.module';
import {HomeModule} from './home/home.module';
import {ConfirmDialogComponent} from './common/dialogs/confirm-dialog/confirm-dialog.component';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent, ConfirmDialogComponent
  ],
  imports: [
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    MatSnackBarModule,
    MatButtonModule,
    HomeModule,
    ToolbarModule,
    AppRoutingModule
  ],
  providers: [UtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
