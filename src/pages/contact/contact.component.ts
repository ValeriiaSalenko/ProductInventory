import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { Http } from '@angular/http';


declare var google;

@IonicPage({
  name: 'contact',
  segment: 'contact'
})

@Component({
  selector: 'contact-component',
  templateUrl: 'contact.component.html',

})
export class ContactComponent {

  nameUser: string;
  emailUser: string;
  subjectUser: string;
  messageUser: string;

  @ViewChild('email') email;
  @ViewChild('name') name;
  @ViewChild('subj') subj;
  @ViewChild('mess') mess;

  errorName: boolean = false;
  errorEmail: boolean = false;
  errorSubj: boolean = false;
  errorMess: boolean = false;
  sentMess: boolean = false;

  regEx = /^\w+@\w+\.\w{2,4}$/i;
  regName = /^[a-zA-Z0-9_ ]+$/i;
  regMes = /^[a-zA-Z0-9_ ]+$/im;

  constructor(public navCtrl: NavController, public http: Http) {

  }

 /* doGet(){
    let x = {nameUsers:this.nameUser, emailUsers: this.emailUser, subjectUsers: this.subjectUser, messageUsers: this.messageUser};
    console.log(x);
    this.http.post('http://localhost:3000/', x)
      .subscribe(
        data=>{
          alert('OK');
          alert(x);

        }
    )

  }*/

  itemAbout() {
    this.navCtrl.push('about');
  }

  itemContact() {
    this.navCtrl.push('contact');
  }

  itemTapped() {
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
    this.sentMess = false;


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

      let x = {nameUsers:this.nameUser, emailUsers: this.emailUser, subjectUsers: this.subjectUser, messageUsers: this.messageUser};
      console.log(x);
      this.http.post('http://localhost:3000/', x)
        .subscribe(
          data=>{
            alert('OK');
            alert(x);

          }
        );


      this.sentMess = true;

      let _this = this;
      setTimeout(() => _this.sentMess = false, 3000);

      this.name.value = "";
      this.email.value = "";
      this.subj.value = "";
      this.mess.value = "";

    }
  }
}




