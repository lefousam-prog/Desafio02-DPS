import { Component, OnInit } from '@angular/core';

import { Shopping } from '../../../models/shopping';

import { ShoppingService } from '../../../services/shopping.service';

import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

import { jsPDF } from "jspdf";

import * as printJS from 'print-js';

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

  public generarTicket(shoppingprint: Shopping){

    
    printJS({
      printable: [{
        "ID de la compra" : shoppingprint.$key,
        "Código del producto" : shoppingprint.code_product,
        "Nombre del producto" : shoppingprint.description_product,
        "Dui del cliente" : shoppingprint.dui_client,
        "Nombre del cliente" : shoppingprint.name_client,
        "Precio cancelado (Incluye descuento si aplica)" : shoppingprint.price
      }],
      properties: ['ID de la compra', 'Nombre del cliente', 'Dui del cliente', 'Código del producto', 'Nombre del producto', 'Precio cancelado (Incluye descuento si aplica)'],
      type: 'json',
      header: 'Ticket de compra (Tienda Don Diego)'
    });
    /*
    const doc = new printJS();
    doc.html("<center><h1>Ticket de compra de producto</h1></center> <p>Nombre del cliente: <b>"+shoppingprint.name_client+"</b></p><br/>  <p>Dui del cliente: <b>"+shoppingprint.dui_client+"</b></p><br/><br/> <table border='1'><tr><td>Código del producto</td><td>Nombre del producto</td><td>Precio del producto (Descuento aplicado)</td></tr><tr><td>"+shoppingprint.code_product+"</td><td>"+shoppingprint.description_product+"</td><td>"+shoppingprint.price+"</td></tr></table> <center><h3>¡La compra se realizo de forma satisfactoria!</h3></center>");
    doc.save("ticket_de_compra.pdf");*/
  }

}
