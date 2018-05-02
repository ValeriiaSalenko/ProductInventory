import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {RegistrationPage} from "../registration/registration.component";


@IonicPage({
  name: 'login-ionic',
  segment: 'login-ionic'
})


@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController) {

  }
  itemTapped(event, item) {
    this.navCtrl.push(RegistrationPage, {
      item: item
    });
  }
  
}
