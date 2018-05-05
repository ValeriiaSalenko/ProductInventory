import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { List } from 'ionic-angular';

@IonicPage({
  name: 'main',
  segment: 'main'
})

@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html'
})

export class MainPage {
  @ViewChild(List) list: List;

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
