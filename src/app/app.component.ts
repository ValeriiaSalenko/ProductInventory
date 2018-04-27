import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login.component";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public rootPage: any = LoginPage;

  constructor(platform: Platform,  splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();
    });
  }
}
