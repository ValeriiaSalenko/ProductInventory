import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
import { MainPage } from './main.component';

@NgModule({
  declarations: [
    MainPage
  ],
  imports: [
    IonicPageModule.forChild(MainPage)
  ],
  exports: [
    MainPage
  ]
})
export class  MainPageModule {}
