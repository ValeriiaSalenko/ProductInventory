import {User} from './user';
import { Input, Component } from '@angular/core';


export class DataService {

  private data: User[] = [
    {name: "Lera", email: "vaslnko25@gmail.com", subj: "LAV", mess: "lalalalalla"},
    {name: "Lena", email: "valeriiasalenko@gmail.com", subj: "CAT", mess: "kakakak"},
  ];

  postData(): User[] {

    return this.data;
  }
}
