import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController) {

  }
  itemTapped(event, item) {


    this.navCtrl.push(RegistrationPage, {
      item: item
    });
  }
<<<<<<< HEAD
  
=======
  signIn(){
    console.log(this.email.value, this.password.value);
  }

>>>>>>> f283dfc808fa0b1a3f56bee0611eb7112864cfed
}
