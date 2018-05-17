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

  errorEmail1: boolean = false; // Error text 'User not found!'
  errorEmail2: boolean = false; // Error text 'Enter the e-mail, please'
  errorPass1: boolean = false;  // Error text 'Enter password!'
  errorPass2: boolean = false;  // Error text 'Wrong password!!!'

  constructor(public navCtrl: NavController) {

    if(localStorage.getItem('nowUser') != null)
      if(localStorage.getItem('nowUser').length > 0) this.navCtrl.push('main');
  }

  /**
   * Function to go to the page 'registration'
   */
  itemTapped() {
    this.navCtrl.push('registration');
  }

  /**
   * Function for validate inputs
   */
  validation() {
    if (this.email === undefined || this.email.value === '') {
      this.errorEmail2 = true;
    }

    if (this.password === undefined || this.password.value === '') {
      this.errorPass1 = true;
    }

    if(!this.errorEmail2) {
      let emailCheck = JSON.parse(localStorage.getItem('usersArray')) || [];
      let userF = false;
      for (let i = 0; i < emailCheck.length; i++) {
        if (emailCheck[i].email.toLowerCase() == this.email.value.toLowerCase()) {
          userF = true;
        }
      }
      if(!userF){
        this.errorEmail1 = true;
      }
    }

    if (!this.errorPass1 && !this.errorEmail1 && !this.errorEmail2)
      return true;
  }

  /**
   * this is singIn function.
   * Verify existence of user and authorize him
   *
   */
  signIn() {
    this.errorEmail1 = false;
    this.errorEmail2 = false;
    this.errorPass1 = false;
    this.errorPass2 = false;

    if (this.validation()) {
      let users = JSON.parse(localStorage.getItem('usersArray')) || [];

      for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == this.email.value.toLowerCase()) {
          if (users[i].password == this.password.value) {
            this.navCtrl.push('main');
            localStorage.setItem('nowUser', users[i].email);
            return;
          } else {
            this.errorPass2 = true;
            return;
          }
        }
      }
    }
  }

}

