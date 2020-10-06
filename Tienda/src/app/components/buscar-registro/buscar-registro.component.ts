import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

//Service
import { AuthService } from "../../services/auth.service";

import { Shopping } from '../../models/shopping';

import { Products } from '../../models/products';

import { ShoppingService } from '../../services/shopping.service';

import { ProductsService } from '../../services/products.service';

import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-buscar-registro',
  templateUrl: './buscar-registro.component.html',
  styleUrls: ['./buscar-registro.component.css']
})
export class BuscarRegistroComponent implements OnInit {
  public optionsearch: string;
  public keyword: string;
  productsList: Products[];
  shoppingList: Shopping[];

  constructor(
    public productsService: ProductsService,
    public shoppingService: ShoppingService,
    public toastr: ToastrService,
    public authService: AuthService
  ) { 
  }

  ngOnInit() {
    this.optionsearch = "0";
    this.keyword = "";
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
  
  onSubmit(searchForm: NgForm){
    let valopt = this.optionsearch;
    let word = this.keyword;
    let stringP = "";
    let stringS = "";
    this.productsList.forEach(function(value){
      switch (valopt){
        case "0":
          if(word == value.$key){ 
            stringP = stringP + "<tr><td>"+value.$key+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "3":
          if(word == value.code_product){ 
            stringP = stringP + "<tr><td>"+value.$key+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "4":
          if(word == value.description_product){ 
            stringP = stringP + "<tr><td>"+value.$key+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "5":
          if(word == value.price.toString()){ 
            stringP = stringP + "<tr><td>"+value.$key+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
      }
    });

    document.getElementById("registrosP").innerHTML = stringP;

    this.shoppingList.forEach(function(value){
      switch (valopt){
        case "0":
          if(word == value.$key){ 
            stringS = stringS + "<tr><td>"+value.$key+"</td><td>"+value.name_client+"</td><td>"+value.dui_client+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "1":
          if(word == value.name_client){ 
            stringS = stringS + "<tr><td>"+value.$key+"</td><td>"+value.name_client+"</td><td>"+value.dui_client+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "2":
          if(word == value.dui_client){ 
            stringS = stringS + "<tr><td>"+value.$key+"</td><td>"+value.name_client+"</td><td>"+value.dui_client+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "3":
          if(word == value.code_product){ 
            stringS = stringS + "<tr><td>"+value.$key+"</td><td>"+value.name_client+"</td><td>"+value.dui_client+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "4":
          if(word == value.description_product){ 
            stringS = stringS + "<tr><td>"+value.$key+"</td><td>"+value.name_client+"</td><td>"+value.dui_client+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
        case "5":
          if(word == value.price.toString()){ 
            stringS = stringS + "<tr><td>"+value.$key+"</td><td>"+value.name_client+"</td><td>"+value.dui_client+"</td><td>"+value.code_product+"</td><td>"+value.description_product+"</td><td>"+value.price+"</td></tr>";
          }
          break;
      }
    });

    document.getElementById("registrosS").innerHTML = stringS;
  }

  resetForm(searchForm?: NgForm) {
    if(searchForm != null)
    searchForm.reset();
  }

}
