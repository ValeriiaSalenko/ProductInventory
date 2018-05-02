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
  signIn(){
    if(!!this.email.value) {
      if (!!this.password.value) {
        let users = JSON.parse(localStorage.getItem('itemsArray')) || [];

        for (let i = 0; i < users.length; i++) {
          if (users[i].email == this.email.value) {
            var userF = true;
            if (users[i].password == this.password.value) {
              alert("Login confimed!");
              return;
            } else {
              alert("Wrong password!!!");
              return;
            }
          }
        }
        if(!userF) {
          alert("User not found!");
        }
      } else {
        alert("Enter password!");
      }
    } else {
      alert("Enter e-mail!");
    }
  }

}
