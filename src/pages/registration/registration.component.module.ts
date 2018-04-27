import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
import { RegistrationPage} from './registration.component';

@NgModule({
  declarations: [
    RegistrationPage
  ],
  imports: [
    IonicPageModule.forChild(RegistrationPage)
  ],
  exports: [
    RegistrationPage
  ]
})
export class  RegistrationPageModule {}
