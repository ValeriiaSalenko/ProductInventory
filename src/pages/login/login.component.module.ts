import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
import { LoginPage } from "./login.component";
import { MainPage } from "../main/main.component"

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  exports: [
    LoginPage
  ]
})
export class  LoginPageModule {}
