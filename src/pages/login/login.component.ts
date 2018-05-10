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

  errorEmail1: boolean = false;
  errorEmail2: boolean = false;
  errorPass1: boolean = false;
  errorPass2: boolean = false;

  constructor(public navCtrl: NavController) {

  }
  itemTapped() {
    this.navCtrl.push('registration');
  }

  signIn() {
    this.errorEmail1 = false;
    this.errorEmail2 = false;
    this.errorPass1 = false;
    this.errorPass2 = false;

    // this.navCtrl.push('main');
    // return;

    if (this.email.value === '') {
      this.errorEmail2 = true;
    }

    if (this.password.value === '') {
      this.errorPass1 = true;
    }

    if(!this.errorEmail2) {
      let emailCheck = JSON.parse(localStorage.getItem('usersArray')) || [];
      let userF = false;
      for (let i = 0; i < emailCheck.length; i++) {
        if (emailCheck[i].email.toLowerCase() == this.email.value.toLowerCase()) {
          userF = true;
          //userNotFound
        }
      }
      if(!userF){
        this.errorEmail1 = true;
      }
    }

    if (!this.errorPass1 && !this.errorEmail1 && !this.errorEmail2) {
      let users = JSON.parse(localStorage.getItem('usersArray')) || [];

      for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == this.email.value.toLowerCase()) {
          if (users[i].password == this.password.value) {
            this.navCtrl.push('main', {myEmail: users[i].email});
            return;
          } else {
            this.errorPass2 = true;
            // alert("Wrong password!!!");
            return;
          }
        }
      }
    }
  }
}

