import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Shopping } from '../models/shopping';

@Injectable({
  providedIn: 'root'
})

export class ShoppingService {

  shoppingList: AngularFireList<any>;

  selectedShopping: Shopping = new Shopping();

  constructor(private firebase: AngularFireDatabase) { }

  getShopping(){
    return this.shoppingList = this.firebase.list('shopping')
  }

  insertShopping(shopping: Shopping) {
    this.shoppingList.push({
      name_client: shopping.name_client,
      dui_client: shopping.dui_client,
      code_product: shopping.code_product,
      description_product: shopping.description_product,
      price: shopping.price
    });
  }

  updateShopping(shopping: Shopping) {
    this.shoppingList.update(shopping.$key, {
      name_client: shopping.name_client,
      dui_client: shopping.dui_client,
      code_product: shopping.code_product,
      description_product: shopping.description_product,
      price: shopping.price
    });
  }

  deleteShopping($key: string) {
    this.shoppingList.remove($key);
  }
}
