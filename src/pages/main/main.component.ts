import { Component } from '@angular/core';
import { NavParams, NavController, IonicPage } from 'ionic-angular';

/**
 * class for standard product in our stock
 */
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
  myEmail: string = localStorage.getItem('nowUser');
  validationError: boolean;

  //errorMessages

  errorTextMass : string[] = [];
  errorText : string;

  //end of errorMessages

  // VAR FOR HLIB
  sortName : number = 0;
  sortDate : number = 0;
  sortExpDate: number = 0;
  sortPrice: number = 0;
  sortWhoCrt : number = 0;
  // End of VAR FOR HLIB
  /**
   * Standard constructor for initialize standard rows to table
   *
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   */
  constructor(private navParams: NavParams, public navCtrl: NavController) {
    this.newItem = false;
    this.new  = true;
    this.parseItems();
    if(localStorage.getItem('nowUser') != null)
      if(this.myEmail.length === 0) this.itemTapped();

    for(let i = 0; i < this.items.length; i++)
      this.items[i].isEdit = false;

    if (this.items.length == 0) {
      this.items.push(new Item(this.items.length + 1, 'Candy', '2018-04-06', '2018-06-06', 20, 'iLoveMax@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Milk', '2018-05-06', '2018-05-22', 12, 'iLoveLera@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Milka', '2018-01-06', '2018-07-06', 15, 'MotleyWildside@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Coffee', '2018-06-06', '2019-06-06', 35, 'iLoveMax@gmail.com', false));
      this.items.push(new Item(this.items.length + 1, 'Tea', '2017-12-06', '2018-12-06', 18, 'iLoveMax@gmail.com', false));
      localStorage.setItem('productsArray', JSON.stringify(this.items));
    }
  }

  /**
   * Function for parse items from localStorage and show their to table
   */
  parseItems() {
    this.items = JSON.parse(localStorage.getItem('productsArray')) || [];
  }

  /**
   * Function for creation correct errorMessage
   * @param nameOf
   * @param expDate
   * @param price
   */
  createErrorMessage(nameOf, expDate, price) {
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

  /**
   * Function that does not allow editing two fields at once or delete other row if another row is editing
   * @param closing (close or open rowEditor)
   * @returns {boolean}
   */
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

  /**
   * Function for editing name, expDate and price in item
   *
   * @param numb - number of element in array
   * @param edit - now editing another row or not?
   * @param nameOf
   * @param expDate
   * @param price
   */
  editRow(numb, edit, nameOf, expDate, price) {

      if (edit) {

        this.createErrorMessage(nameOf, expDate, price);

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
      if(this.myEmail.length !== 0) {
        if (!this.newItem && !this.editValid(edit))
          this.items[numb].isEdit = !this.items[numb].isEdit;
        localStorage.setItem('productsArray', JSON.stringify(this.items));
      }
  }

  /**
   * Create string with nowDate in (YYYY-MM-DD) format
   *
   * @returns {string} - nowDate
   */
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

  /**
   * Function for creating new object
   */
  createNew() {
    console.log(this.myEmail.length)
    if(this.myEmail.length !== 0) {
      if (this.validationError = true) this.validationError = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].isEdit == true) {
          this.new = false;
          return;
        } else {
          this.new = true;
        }
      }
      if (this.new) {

        this.newItem = !this.newItem;
      }
    }
  }

  /**
   * Function for adding to localStorage new object
   * @param nameOf
   * @param expDate
   * @param price
   */
  addToLocalStorage(nameOf, expDate, price) {
    let oldItems = JSON.parse(localStorage.getItem('productsArray')) || [];

    let newMyItem = new Item(this.items.length + 1, nameOf, this.nowDate, expDate, price, this.myEmail, false);

    oldItems.push(newMyItem);

    localStorage.setItem('productsArray', JSON.stringify(oldItems));


  }

  /**
   * Function for correcting order of numbers after deleting row
   * @param items
   */
  makeNormalNumbers(items) {
    items.sort(function (itemA, itemB) {
      return Number(itemA.numb+1) > Number(itemB.numb+1);
    });

    for(let i = 0; i < items.length; i++) {
      items[i].numb = i + 1;
    }
  }

  /**
   * Delete row
   * @param numb
   */
  deleteRow(numb) {
    if(!this.newItem && !this.editValid(false) && this.myEmail.length !== 0) {
      let items = JSON.parse(localStorage.getItem('productsArray')) || [];

      items.splice(numb, 1);

      this.makeNormalNumbers(items);

      localStorage.setItem('productsArray', JSON.stringify(items));

      this.parseItems();
    }
  }

  /**
   * Function for adding new row
   * @param nameOf
   * @param expDate
   * @param price
   */
  addNew(nameOf, expDate, price) {

    this.createErrorMessage(nameOf, expDate, price);

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

  /**
   * Function for sorting string column
   * @param itemsForSorting - array for sorting
   * @param sortingOrder
   * @param whatSort
   */
  sortingStringFunc(itemsForSorting, sortingOrder, whatSort) {
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

  /**
   * Function for sorting date column
   * @param itemsForSorting - array for sorting
   * @param sortingOrder
   * @param whatSort
   */
  sortingDateFunc(itemsForSorting, sortingOrder, whatSort) {
    if(sortingOrder) {
      itemsForSorting.sort(function (itemA, itemB) {
        let yearA = Number(itemA[whatSort].slice(0, 4));
        let yearB = Number(itemB[whatSort].slice(0, 4));

        let mounthA = Number(itemA[whatSort].slice(5, 7)) - 1;
        let mounthB = Number(itemB[whatSort].slice(5, 7)) - 1;

        let dayA = Number(itemA[whatSort].slice(8, 10));
        let dayB = Number(itemB[whatSort].slice(8, 10));

        let dateA = new Date(yearA, mounthA, dayA);
        let dateB = new Date(yearB, mounthB, dayB);

        return dateA > dateB;
      })
    } else {
      itemsForSorting.sort(function (itemA, itemB) {
        let yearA = Number(itemA[whatSort].slice(0, 4));
        let yearB = Number(itemB[whatSort].slice(0, 4));

        let mounthA = Number(itemA[whatSort].slice(5, 7)) - 1;
        let mounthB = Number(itemB[whatSort].slice(5, 7)) - 1;

        let dayA = Number(itemA[whatSort].slice(8, 10));
        let dayB = Number(itemB[whatSort].slice(8, 10));

        let dateA = new Date(yearA, mounthA, dayA);
        let dateB = new Date(yearB, mounthB, dayB);

        return dateA < dateB;
      })
    }
    localStorage.setItem('productsArray', JSON.stringify(itemsForSorting));
    this.parseItems();
  }

  /**
   * Function for sorting array
   * @param colForSorting
   * @param sortingOrder
   *
   */
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

        this.sortDate = 0;
        this.sortExpDate = 0;
        this.sortPrice = 0;
        this.sortWhoCrt = 0;

        if(++this.sortName == 1)
          this.sortingStringFunc(itemsForSorting, true, 'nameOf');
        else if (this.sortName == 2)
          this.sortingStringFunc(itemsForSorting, false, 'nameOf');
        else {
          this.sortName = 0;
          this.sortCol('Number', true);
        }
        break;
      case 'CrDate': // Сортировка по дате создания

        this.sortName = 0;
        this.sortExpDate = 0;
        this.sortPrice = 0;
        this.sortWhoCrt = 0;

        if(++this.sortDate == 1)
          this.sortingDateFunc(itemsForSorting, true, 'date');
        else if (this.sortDate == 2)
          this.sortingDateFunc(itemsForSorting, false, 'date');
        else {
          this.sortDate = 0;
          this.sortCol('Number', true);
        }
        break;
      case 'ExpDate': // Сортировка по дате истечения срока годности

        this.sortName = 0;
        this.sortDate = 0;
        this.sortPrice = 0;
        this.sortWhoCrt = 0;

        if(++this.sortExpDate == 1)
          this.sortingDateFunc(itemsForSorting, true, 'expDate');
        else if (this.sortExpDate == 2)
          this.sortingDateFunc(itemsForSorting, false, 'expDate');
        else {
          this.sortExpDate = 0;
          this.sortCol('Number', true);
        }
        break;
      case 'Price':

        this.sortName = 0;
        this.sortDate = 0;
        this.sortExpDate = 0;
        this.sortWhoCrt = 0;

        if(++this.sortPrice == 1)
          itemsForSorting.sort(function (itemA, itemB) {
            return Number(itemA.price) > Number(itemB.price);
          });
        else if (this.sortPrice == 2)
          itemsForSorting.sort(function (itemA, itemB) {
            return Number(itemA.price) < Number(itemB.price);
          });
        else {
          this.sortPrice = 0;
          this.sortCol('Number', true);
          break;
        }
        localStorage.setItem('productsArray', JSON.stringify(itemsForSorting));
        this.parseItems();
        break;
      case 'WhoCrt':

        this.sortName = 0;
        this.sortDate = 0;
        this.sortExpDate = 0;
        this.sortPrice = 0;

        if(++this.sortWhoCrt == 1)
          this.sortingStringFunc(itemsForSorting, true, 'whoCrt');
        else if (this.sortWhoCrt == 2)
          this.sortingStringFunc(itemsForSorting, false, 'whoCrt');
        else {
          this.sortWhoCrt = 0;
          this.sortCol('Number', true);
        }
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
    localStorage.setItem('nowUser', '');
    this.navCtrl.push('login');
  }
  itemMain() {
    this.navCtrl.push('main');
  }

}
