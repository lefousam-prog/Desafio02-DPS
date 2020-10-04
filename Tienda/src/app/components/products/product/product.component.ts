import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Products } from '../../../models/products';

import { ProductsService } from '../../../services/products.service';

import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.productsService.getProducts;
    this.resetForm();
  }

  onSubmit(productsForm: NgForm){
    if(productsForm.value.$key == null){
      this.productsService.insertProducts(productsForm.value);
      this.toastr.success("Registro ingresado", "El producto se ha ingresado de forma satisfactoria");
      this.resetForm();
    }
    else{
      this.productsService.updateProducts(productsForm.value);
      this.toastr.success("Registro actualizado", "El producto se ha actualizado de forma satisfactoria");
      this.resetForm();
    }
  }

  resetForm(productsForm?: NgForm) {
    if(productsForm != null)
      productsForm.reset();
      this.productsService.selectedProducts = new Products();
  }

}
