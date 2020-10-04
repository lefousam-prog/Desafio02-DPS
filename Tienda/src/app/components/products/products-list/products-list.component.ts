import { Component, OnInit } from '@angular/core';

import { Products } from '../../../models/products';

import { ProductsService } from '../../../services/products.service';

import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productsList: Products[];

  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.productsService.getProducts().snapshotChanges().subscribe(item => {
      this.productsList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productsList.push(x as Products);
      });
    });
  }

  onEdit(products: Products){
    this.productsService.selectedProducts = Object.assign({}, products);
  }

  onDelete($key: string) {
    if(confirm("¿Esta seguro qué desea eliminar el registro?")) {
      this.productsService.deleteProducts($key);
      this.toastr.success("Registro eliminado", "El producto se ha eliminado de forma satisfactoria");
    }
  }
}
