import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  productsList: AngularFireList<any>;

  selectedProducts: Products = new Products();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts(){
    return this.productsList = this.firebase.list('products')
  }

  insertProducts(products: Products) {
    this.productsList.push({
      code_product: products.code_product,
      description_product: products.description_product,
      price: products.price
    });
  }

  updateProducts(product: Products) {
    this.productsList.update(product.$key, {
      code_product: product.code_product,
      description_product: product.description_product,
      price: product.price
    });
  }

  deleteProducts($key: string) {
    this.productsList.remove($key);
  }
}
