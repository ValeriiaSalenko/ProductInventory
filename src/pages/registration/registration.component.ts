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

  errorEmail1: boolean = false;
  errorEmail2: boolean = false;
  errorEmail3: boolean = false;
  errorPass1: boolean = false;
  errorPass2: boolean = false;
  regEx = /^\w+@\w+\.\w{2,4}$/i;

  constructor(public navCtrl: NavController) {

  }

  itemTapped(event, item) {
    this.navCtrl.push(LoginPage, {
      item: item
    });
  }
  regMe(){
    this.errorEmail1 = false;
    this.errorEmail2 = false;
    this.errorEmail3 = false;
    this.errorPass1 = false;
    this.errorPass2 = false;
    //console.log(this.email.value);
    if (this.regEx.test(this.email.value)) {
      if (!!this.email.value) {
        if (this.password.value.length >= 6) {
          // console.log(this.password.value, this.repPass.value);
          if (this.password.value == this.repPass.value && !!this.password.value && !!this.repPass.value) {


            let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
            for (let i = 0; i < oldItems.length; i++) {
              if (oldItems[i].email == this.email.value) {
                this.errorEmail1 = true;
                //alert('This user already register!');
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
            this.errorPass1 = true;
            //alert("Passwords do not match!");
          }
        } else {
          this.errorPass2 = true;
          //alert("Password must be at least 6 characters long");
        }
      } else {
        this.errorEmail2 = true;
        //alert("Enter the e-mail, please");
      }
    } else {
      this.errorEmail3 = true;
      //alert('ВВЕДИ МЫЛО, ДУРАК')
    }

    // var mass = JSON.parse(localStorage.getItem('itemsArray')) || [];
    // for(let i = 0; i < mass.length; i++){
    //   console.log(mass[i].email + ":" + mass[i].password);
    // }

  }
}
