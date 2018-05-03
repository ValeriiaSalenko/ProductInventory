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

  errorEmail1: boolean = false;
  errorEmail2: boolean = false;
  errorPass1: boolean = false;
  errorPass2: boolean = false;

  constructor(public navCtrl: NavController) {

  }
  itemTapped(event, item) {
    this.navCtrl.push(RegistrationPage, {
      item: item
    });
  }

  signIn() {
    this.errorEmail1 = false;
    this.errorEmail2 = false;
    this.errorPass1 = false;
    this.errorPass2 = false;
    if (this.email.value !== '') {
      if (this.password.value !== '') {
        let users = JSON.parse(localStorage.getItem('itemsArray')) || [];

        for (let i = 0; i < users.length; i++) {
          if (users[i].email == this.email.value) {
            var userF = true;
            if (users[i].password == this.password.value) {
              alert("Login confimed!");
              return;
            } else {
              this.errorPass2 = true;

              // alert("Wrong password!!!");
              return;
            }
          }
        }
        if(!userF) {
          this.errorEmail1 = true;
          //alert("User not found!");
        }
      } else {
        this.errorPass1 = true;
        // alert("Enter password!");
      }
    } else {
      console.log(this.email);
      this.errorEmail2 = true;
      //alert("Enter e-mail!");
    }
  }


}
