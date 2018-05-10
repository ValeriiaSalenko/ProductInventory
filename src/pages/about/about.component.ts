import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage({
  name: 'about',
  segment: 'about'
})

@Component({
  selector: 'about-component',
  templateUrl: 'about.component.html'
})
export class AboutComponent {

  constructor(public navCtrl: NavController) {

  }
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

}
