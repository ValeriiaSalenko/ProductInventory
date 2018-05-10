import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { RegistrationPageModule } from '../pages/registration/registration.component.module';
import { LoginPageModule } from '../pages/login/login.component.module';
import { MainPageModule } from '../pages/main/main.component.module';
import { AboutComponentModule } from '../pages/about/about.component.module';
import { ContactComponentModule } from '../pages/contact/contact.component.module';

import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RegistrationPageModule,
    LoginPageModule,
    MainPageModule,
    AboutComponentModule,
    ContactComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
