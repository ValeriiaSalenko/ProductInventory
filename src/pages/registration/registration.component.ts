import {Component, ViewChild} from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LoginPage } from "../login/login.component";

@IonicPage({
  name: 'registration-ionic',
  segment: 'registration-ionic'
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

  itemTapped(event, item) {
    this.navCtrl.push(LoginPage, {
      item: item
    });
  }
  regMe(){
    //console.log(this.email.value);
    if(!!this.email.value) {
      if(this.password.value.length >= 6 ) {
        if (this.password.value == this.repPass.value && !!this.password.value && !!this.repPass.value) {


          let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
          for (let i = 0; i < oldItems.length; i++) {
            if (oldItems[i].email == this.email.value) {
              alert('This user already register!');
              return;
            }

          }
          var newItem = {
            'email': this.email.value,
            'password': this.password.value
          };

          oldItems.push(newItem);

          localStorage.setItem('itemsArray', JSON.stringify(oldItems));

          alert("Thank you for registration!");
        } else {
          alert("Passwords do not match!");
        }
      } else {
        alert("Password must be at least 6 characters long");
      }
    } else {
      alert("Enter the e-mail, please");
    }

    // var mass = JSON.parse(localStorage.getItem('itemsArray')) || [];
    // for(let i = 0; i < mass.length; i++){
    //   console.log(mass[i].email + ":" + mass[i].password);
    // }

  }
}
