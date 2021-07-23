import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AdminAuthGuard } from 'admin/services/admin-auth-guard.service';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AdminModule,
    CoreModule,
    LayoutsModule,
    SharedModule,
    ShoppingModule
  ],

  providers: [
    AdminAuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
