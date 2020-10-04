import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Shopping } from '../../../models/shopping';

import { Products } from '../../../models/products';

import { ShoppingService } from '../../../services/shopping.service';

import { ProductsService } from '../../../services/products.service';

import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  
  productsList: Products[];
  shoppingList: Shopping[];

  constructor(
    public productsService: ProductsService,
    public shoppingService: ShoppingService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.shoppingService.getShopping();

    this.productsService.getProducts().snapshotChanges().subscribe(item => {
      this.productsList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productsList.push(x as Products);
      });
    });

    this.shoppingService.getShopping().snapshotChanges().subscribe(item => {
      this.shoppingList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.shoppingList.push(x as Shopping);
      });
    });

    this.resetForm();
  }

  onSubmit(shoppingForm: NgForm){
    if(shoppingForm.value.$key == null){
      this.shoppingService.insertShopping(shoppingForm.value);
      this.toastr.success("Registro ingresado", "La compra se ha ingresado de forma satisfactoria");
      this.resetForm();
    }
    else{
      this.shoppingService.updateShopping(shoppingForm.value);
      this.toastr.success("Registro actualizado", "La compra se ha actualizado de forma satisfactoria");
      this.resetForm();
    }
  }

  resetForm(shoppingForm?: NgForm) {
    if(shoppingForm != null)
      shoppingForm.reset();
      this.shoppingService.selectedShopping = new Shopping();
  }

  cambio(){
    let val = this.shoppingService.selectedShopping.description_product;
    var pr:number;
    let code;
    this.productsList.forEach(function(value){
      if(val == value.description_product){
          code = value.code_product;
          pr = value.price;
      }
    });

    this.shoppingService.selectedShopping.code_product = code;

    let dui = this.shoppingService.selectedShopping.dui_client;
    var contador:number = 0;
    this.shoppingList.forEach(function(value){
      if(dui == value.dui_client){
        contador++;
      }
    });

    if(contador >= 1 && contador <= 3){
      pr = pr - pr*0.05;
    }

    if(contador >= 4){
      pr = pr - pr*0.08;
    }

    this.shoppingService.selectedShopping.price = pr;
  }

}
