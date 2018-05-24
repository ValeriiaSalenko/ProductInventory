import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Http } from "@angular/http";


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

  errorEmail1: boolean = false; // Error text 'User not found!'
  errorEmail2: boolean = false; // Error text 'Enter the e-mail, please'
  errorPass1: boolean = false;  // Error text 'Enter password!'
  errorPass2: boolean = false;  // Error text 'Wrong password!!!'

  regEx = /^\w+@\w+\.\w{2,4}$/i;
  usersInJSON : string;

  constructor(public navCtrl: NavController, public http: Http) {
    if(localStorage.getItem('nowUser') != null)
      if(localStorage.getItem('nowUser').length > 0) this.navCtrl.push('main');
    this.http.get('http://localhost:3000/registration')
      .subscribe(res => this.usersInJSON = res.text());
  }

  /**
   * Function to go to the page 'login'
   */
  itemTapped() {
    this.navCtrl.push('login');
  }

  /**
   * Function for validate inputs and correct registration
   */

  validation() {

    if (!this.regEx.test(this.email.value)) {
      this.errorEmail2 = true;
    }

    if(!this.errorEmail2) {
      let emailCheck = JSON.parse(this.usersInJSON) || [];

      for (let i = 0; i < emailCheck.length; i++) {
        if (emailCheck[i].email.toLowerCase() == this.email.value.toLowerCase()) {
          this.errorEmail1 = true;
          //alert('This user already register!');
        }
      }
    }

    if (!(this.password.value.length >= 6)) {
      this.errorPass2 = true;
    }
    // console.log(this.password.value, this.repPass.value);
    if (!(this.password.value == this.repPass.value)) {
      this.errorPass1 = true;
    }
    if (!this.errorPass1 && !this.errorPass2 && !this.errorEmail1 && !this.errorEmail2)
      return true;
  }

  /**
   * Function 'regMe' needed for register new user
   */
  regMe() {

    this.errorEmail1 = false;
    this.errorEmail2 = false;
    this.errorPass1 = false;
    this.errorPass2 = false;
    //console.log(this.email.value);
    if (this.validation()) {

      let newUser = {
        email: this.email.value,
        password: this.password.value
      };

      this.http.post('http://localhost:3000/registration', newUser)
        .subscribe();

      alert("Thank you for registration!");
      this.navCtrl.push('main');
      localStorage.setItem('nowUser', this.email.value);
      // this.navCtrl.push('login');
    }
  }
}
