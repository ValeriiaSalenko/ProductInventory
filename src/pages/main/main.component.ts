import { Component } from '@angular/core';
import { NavParams, NavController, IonicPage } from 'ionic-angular';

class Item {
  numb: number;
  nameOf: string;
  date: string;
  expDate: string;
  price: number;
  whoCrt: string;
  isEdit: boolean;

  constructor(numb: number, nameOf: string, date: string, expDate: string, price: number, whoCrt: string, isEdit: boolean){
    this.numb = numb;
    this.nameOf = nameOf;
    this.date = date;
    this.expDate = expDate;
    this.price = price;
    this.whoCrt = whoCrt;
    this.isEdit = isEdit;
  }
}


@IonicPage({
  name: 'main',
  segment: 'main'
})

@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
})

export class MainPage {





  items: Item[] = [];

  newItem: boolean = false;
  new : boolean = true;
  nowDate : string = this.getNowDate();
  _nameOf : string;
  _expDate : string;
  _price : number;
  myEmail: string;
  validationError: boolean;

  //errorMessages

  errorTextMass : string[] = [];
  errorText : string;

  //end of errorMessages
  constructor(private navParams: NavParams, public navCtrl: NavController) {
    this.myEmail = navParams.get('myEmail');

    this.parseItems();

    if (this.items.length == 0) {
      this.items.push(new Item(this.items.length + 1, 'Candy', '2018-04-06', '2018-06-06', 20, 'iLoveMax@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Milk', '2018-05-06', '2018-05-22', 12, 'iLoveLera@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Milka', '2018-01-06', '2018-07-06', 15, 'MotleyWildside@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Coffee', '2018-06-06', '2019-06-06', 35, 'iLoveMax@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Tea', '2017-12-06', '2018-12-06', 18, 'iLoveMax@gmail.com', false));
      localStorage.setItem('productsArray', JSON.stringify(this.items));
    }
  }


  parseItems() {
    this.items = JSON.parse(localStorage.getItem('productsArray')) || [];


  }

  makeErrorMessage(nameOf, expDate, price) {
    if (nameOf === undefined || nameOf === '') {
      this.errorTextMass.push('Enter name of product');
      this.validationError = true;
    }

    if (expDate === undefined || expDate === '') {
      this.errorTextMass.push('Enter expire date');
      this.validationError = true;
    }

    if (price === undefined || price === '') {
      this.errorTextMass.push('Enter price');
      this.validationError = true;
    } else {
      if (Number(price) <= 0 || isNaN(Number(price))) {
        this.errorTextMass.push('Enter correct price');
        this.validationError = true;
      }
    }

    this.errorText = this.errorTextMass.join(' | ');
    this.errorTextMass = [];
  }

  editValid(closing) {
    if(closing) return false;
    let number = 0;
    this.items = JSON.parse(localStorage.getItem('productsArray')) || [];
    for (let i = 0; i < this.items.length; i++){
      if (this.items[i].isEdit == true) {
        if (++number > 0)
          return true;
      }
    }
    return false;
  }

  editRow(numb, edit, nameOf, expDate, price, closing) {



      if (edit) {

        this.makeErrorMessage(nameOf, expDate, price);

        if (this.items[numb].expDate !== undefined && this.items[numb].expDate != '' && Number(this.items[numb].price) > 0 && !isNaN(Number(this.items[numb].price)) && this.items[numb].price !== undefined && this.items[numb].nameOf !== undefined) {
          console.log(this.items[numb]);

          //this.items = JSON.parse(localStorage.getItem('productsArray')) || [];

          this.items[numb].nameOf = nameOf;
          this.items[numb].expDate = expDate;
          this.items[numb].price = price;


          this.validationError = false;
        } else {
          return;
        }
      }

      if(!this.newItem && !this.editValid(closing))
        this.items[numb].isEdit = !this.items[numb].isEdit;
      localStorage.setItem('productsArray', JSON.stringify(this.items));
  }

  getNowDate(){
    let now = new Date();
    let currDate = now.getDate();
    let currMonth = now.getMonth() + 1;
    let currYear = now.getFullYear();
    let sCurrMonth = String(currMonth), sCurrDate = String(currDate);
    if (currMonth < 10) sCurrMonth = '0' + currMonth;
    if (currDate < 10) sCurrDate = '0' + currDate;
    return currYear + "-" + sCurrMonth + "-" + sCurrDate;
  }

  createNew() {
    if(this.validationError = true) this.validationError = false;
    for (let i = 0; i < this.items.length; i++){
      if (this.items[i].isEdit == true) {
        this.new = false;
        return;
      } else {
        this.new = true;
      }
    }
    if(this.new) {

      this.newItem = !this.newItem;
    }
  }

  addToLocalStorage(nameOf, expDate, price) {
    let oldItems = JSON.parse(localStorage.getItem('productsArray')) || [];

    let newMyItem = new Item(this.items.length + 1, nameOf, this.nowDate, expDate, price, this.myEmail, false);

    oldItems.push(newMyItem);

    localStorage.setItem('productsArray', JSON.stringify(oldItems));
  }

  makeNormalNumbers(items) {
    items.sort(function (itemA, itemB) {
      //console.log(Number(itemA.numb+1) > Number(itemB.numb+1))
      return Number(itemA.numb+1) > Number(itemB.numb+1);
    });

    for(let i = 0; i < items.length; i++) {
      items[i].numb = i + 1;
    }
  }

  deleteRow(numb) {
    if(!this.newItem && !this.editValid(false)) {
      let items = JSON.parse(localStorage.getItem('productsArray')) || [];

      items.splice(numb, 1);

      this.makeNormalNumbers(items);

      localStorage.setItem('productsArray', JSON.stringify(items));

      this.parseItems();
    }
  }

  addNew(nameOf, expDate, price) {

    this.makeErrorMessage(nameOf, expDate, price);

    if(expDate !== undefined && Number(price) > 0 && !isNaN(Number(price)) && price !== undefined && nameOf !== undefined) {

      this.addToLocalStorage(nameOf, expDate, price);

      this.parseItems();

      //this.items.push(new Item(this.items.length + 1, nameOf, this.nowDate, expDate, price, this.myEmail, false));
      this.newItem = !this.newItem;

      this._expDate = undefined;
      this._nameOf = undefined;
      this._price = undefined;

      this.validationError = false;
    }

  }

  sortingFunc(itemsForSorting, sortingOrder, whatSort) {
    if (sortingOrder) { // Выясняем порядок сортировки
      itemsForSorting.sort(function (itemA, itemB) {
        return itemA[whatSort] > itemB[whatSort];
      })
    } else {
      itemsForSorting.sort(function (itemA, itemB) {
        return itemA[whatSort] < itemB[whatSort];
      })
    }
    //this.makeNormalNumbers(itemsForSorting);
    localStorage.setItem('productsArray', JSON.stringify(itemsForSorting));
    this.parseItems();
  }
//Сортировка
  sortCol(colForSorting, sortingOrder) { // Принимает два параметра: название столбца для сортироки и порядок (По возростанию или убыванию)
    let itemsForSorting = JSON.parse(localStorage.getItem('productsArray')) || [];
    switch (colForSorting) {
      case 'Number':
        if (sortingOrder) { // Выясняем порядок сортировки

          itemsForSorting.sort(function (itemA, itemB) {
            //console.log(Number(itemA.numb+1) > Number(itemB.numb+1))
            return Number(itemA.numb+1) > Number(itemB.numb+1);
          })
        } else {
          itemsForSorting.sort(function (itemA, itemB) {
            return Number(itemA.numb+1) < Number(itemB.numb+1);
          })
        }
        //this.makeNormalNumbers(itemsForSorting);
        localStorage.setItem('productsArray', JSON.stringify(itemsForSorting));
        this.parseItems();
        break;
      case 'Name': // Сортировка по имени
        this.sortingFunc(itemsForSorting, sortingOrder, 'nameOf');
        break;

      case 'CrDate': // Сортировка по дате создания
        if(sortingOrder) {
          itemsForSorting.sort(function (itemA, itemB) {
            let yearA = Number(itemA.date.slice(0, 4));
            let yearB = Number(itemB.date.slice(0, 4));

            let mounthA = Number(itemA.date.slice(6, 7)) - 1;
            let mounthB = Number(itemB.date.slice(6, 7)) - 1;

            let dayA = Number(itemA.date.slice(8, 10));
            let dayB = Number(itemB.date.slice(8, 10));

            let dateA = new Date(yearA, mounthA, dayA);
            let dateB = new Date(yearB, mounthB, dayB);

            return dateA > dateB;
          })
        } else {
          itemsForSorting.sort(function (itemA, itemB) {
            let yearA = Number(itemA.date.slice(0, 4));
            let yearB = Number(itemB.date.slice(0, 4));

            let mounthA = Number(itemA.date.slice(6, 7)) - 1;
            let mounthB = Number(itemB.date.slice(6, 7)) - 1;

            let dayA = Number(itemA.date.slice(8, 10));
            let dayB = Number(itemB.date.slice(8, 10));

            let dateA = new Date(yearA, mounthA, dayA);
            let dateB = new Date(yearB, mounthB, dayB);

            return dateA < dateB;
          })
        }
        //this.makeNormalNumbers(itemsForSorting);
        localStorage.setItem('productsArray', JSON.stringify(itemsForSorting));
        this.parseItems();
        break;
      case 'ExpDate': // Сортировка по дате истечения срока годности
        if(sortingOrder) {
          itemsForSorting.sort(function (itemA, itemB) {
            let yearA = Number(itemA.expDate.slice(0, 4));
            let yearB = Number(itemB.expDate.slice(0, 4));

            let mounthA = Number(itemA.expDate.slice(6, 7)) - 1;
            let mounthB = Number(itemB.expDate.slice(6, 7)) - 1;

            let dayA = Number(itemA.expDate.slice(8, 10));
            let dayB = Number(itemB.expDate.slice(8, 10));

            let dateA = new Date(yearA, mounthA, dayA);
            let dateB = new Date(yearB, mounthB, dayB);

            return dateA > dateB;
          })
        } else {
          itemsForSorting.sort(function (itemA, itemB) {
            let yearA = Number(itemA.expDate.slice(0, 4));
            let yearB = Number(itemB.expDate.slice(0, 4));

            let mounthA = Number(itemA.expDate.slice(6, 7)) - 1;
            let mounthB = Number(itemB.expDate.slice(6, 7)) - 1;

            let dayA = Number(itemA.expDate.slice(8, 10));
            let dayB = Number(itemB.expDate.slice(8, 10));

            let dateA = new Date(yearA, mounthA, dayA);
            let dateB = new Date(yearB, mounthB, dayB);

            return dateA < dateB;
          })
        }
        //this.makeNormalNumbers(itemsForSorting);
        localStorage.setItem('productsArray', JSON.stringify(itemsForSorting));
        this.parseItems();
        break;
      case 'Price': // Сортровка по цене
        if (sortingOrder) { // Выясняем порядок сортировки

          itemsForSorting.sort(function (itemA, itemB) {
            //console.log(Number(itemA.price) > Number(itemB.price))
            return Number(itemA.price) > Number(itemB.price);
          })
        } else {
          itemsForSorting.sort(function (itemA, itemB) {
            return Number(itemA.price) < Number(itemB.price);
          })
        }
        //this.makeNormalNumbers(itemsForSorting);
        localStorage.setItem('productsArray', JSON.stringify(itemsForSorting));
        this.parseItems();
        break;
      case 'WhoCrt': //Сортировка по создателю записи

        this.sortingFunc(itemsForSorting, sortingOrder, 'whoCrt');
        break;
    }

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
