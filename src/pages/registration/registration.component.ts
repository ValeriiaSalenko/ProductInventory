import {Component, ViewChild} from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';



@IonicPage({
  name: 'registration',
  segment: 'registration'
})


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.component.html'
})

export class RegistrationPage {

  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('repPass') repPass;

  constructor(public navCtrl: NavController) {

  }

  itemTapped() {
    this.navCtrl.push('login');
  }

  itemMain() {
    this.navCtrl.push('main');
  }
}

