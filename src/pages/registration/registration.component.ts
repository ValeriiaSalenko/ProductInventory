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

  errorEmail1: boolean = false;
  errorEmail2: boolean = false;
  errorPass1: boolean = false;
  errorPass2: boolean = false;
  regEx = /^\w+@\w+\.\w{2,4}$/i;

  constructor(public navCtrl: NavController) {

  }

  itemTapped() {
    this.navCtrl.push('login');
  }

  itemMain() {
    this.navCtrl.push('main');
  }
  regMe() {
    this.errorEmail1 = false;
    this.errorEmail2 = false;
    this.errorPass1 = false;
    this.errorPass2 = false;
    //console.log(this.email.value);

    if (!this.regEx.test(this.email.value)) {
      this.errorEmail2 = true;
    }
    if(!this.errorEmail2){
      let emailCheck = JSON.parse(localStorage.getItem('itemsArray')) || [];

      for (let i = 0; i < emailCheck.length; i++) {
        if (emailCheck[i].email == this.email.value) {
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

    if (!this.errorPass1 && !this.errorPass2 && !this.errorEmail1 && !this.errorEmail2) {
      let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

      var newItem = {
        'email': this.email.value,
        'password': this.password.value
      };

      oldItems.push(newItem);

      localStorage.setItem('itemsArray', JSON.stringify(oldItems));

      alert("Thank you for registration!");
      // console.log('test');
    }
  }
  //alert("Passwords do not match!");


  // var mass = JSON.parse(localStorage.getItem('itemsArray')) || [];
  // for(let i = 0; i < mass.length; i++){
  //   console.log(mass[i].email + ":" + mass[i].password);
  // }
}
