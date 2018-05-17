import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage({
  name: 'contact',
  segment: 'contact'
})

@Component({
  selector: 'contact-component',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {
  @ViewChild('email') email;
  @ViewChild('name') name;
  @ViewChild('subj') subj;
  @ViewChild('mess') mess;

  errorName: boolean = false;
  errorEmail: boolean = false;
  errorSubj: boolean = false;
  errorMess: boolean = false;

  regEx = /^\w+@\w+\.\w{2,4}$/i;
  regName = /^[a-zа-яё]+$/i;
  regMes = /^[a-zа-яё]+$/i;

  constructor(public navCtrl: NavController) {
    if(localStorage.getItem('nowUser') != null)
      if(localStorage.getItem('nowUser').length === 0) this.itemTapped();
  }

  itemAbout() {
    this.navCtrl.push('about');
  }

  itemContact() {
    this.navCtrl.push('contact');
  }

  itemTapped() {
    localStorage.setItem('nowUser', '');
    this.navCtrl.push('login');
  }

  itemMain() {
    this.navCtrl.push('main');
  }

  sendMes() {

    this.errorEmail = false;
    this.errorName = false;
    this.errorSubj = false;
    this.errorMess = false;


    if (!this.regName.test(this.name.value.toLowerCase())) {
      this.errorName = true;
    }


    if (!this.regEx.test(this.email.value.toLowerCase())) {
      this.errorEmail = true;
    }


    if (!this.regMes.test(this.subj.value.toLowerCase())) {
      this.errorSubj = true;
    }

    if (!this.regMes.test(this.mess.value.toLowerCase())) {
      this.errorMess = true;
    }

    if ((this.regName.test(this.name.value.toLowerCase())) && (this.regMes.test(this.subj.value.toLowerCase())) &&
      (this.regEx.test(this.email.value.toLowerCase())) && (this.regMes.test(this.mess.value.toLowerCase()))){

      this.name.value = " ";
      this.email.value = " ";
      this.subj.value = " ";
      this.mess.value = " ";

    }


  }
}




