import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {LoginPage} from "../login/login.component";

@IonicPage({
  name: 'registration-ionic',
  segment: 'registration-ionic'
})


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.component.html'
})

export class RegistrationPage {
  constructor(public navCtrl: NavController) {

  }

  itemTapped(event, item) {
    this.navCtrl.push(LoginPage, {
      item: item
    });

  }
}
