import { Component, OnInit } from '@angular/core';

import { Shopping } from '../../../models/shopping';

import { ShoppingService } from '../../../services/shopping.service';

import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  shoppingList: Shopping[];

  constructor(
    private shoppingService: ShoppingService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.shoppingService.getShopping().snapshotChanges().subscribe(item => {
      this.shoppingList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.shoppingList.push(x as Shopping);
      });
    });
  }

  onEdit(shopping: Shopping){
    this.shoppingService.selectedShopping = Object.assign({}, shopping);
  }

  onDelete($key: string) {
    if(confirm("¿Esta seguro qué desea eliminar el registro?")) {
      this.shoppingService.deleteShopping($key);
      this.toastr.success("Registro eliminado", "La compra se ha eliminado de forma satisfactoria");
    }
  }

}
