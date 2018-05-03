import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage({
  name: 'login',
  segment: 'login'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})

export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController) {

  }

  itemTapped() {
    this.navCtrl.push('registration');
  }

  itemMain() {
    this.navCtrl.push('main');
  }
}
