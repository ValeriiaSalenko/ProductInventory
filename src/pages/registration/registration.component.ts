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

  constructor(public navCtrl: NavController) {

  }

  itemTapped(event, item) {
    this.navCtrl.push(LoginPage, {
      item: item
    });
  }
  regMe(){
    let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    for(let i = 0; i < oldItems.length; i++)
    {
      if (oldItems[i].email == this.email.value){
        alert('Такой пользователь уже зарегестрирован!');
        return;
      }

    }
    var newItem = {
      'email': this.email.value,
      'password': this.password.value
    };

    oldItems.push(newItem);

    localStorage.setItem('itemsArray', JSON.stringify(oldItems));

    // var mass = JSON.parse(localStorage.getItem('itemsArray')) || [];
    // for(let i = 0; i < mass.length; i++){
    //   console.log(mass[i].email + ":" + mass[i].password);
    // }

  }
}
