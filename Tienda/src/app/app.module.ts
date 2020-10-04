import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
//modulo para base de datos
import { AngularFireDatabaseModule } from '@angular/fire/database';
//modulos para autentificacion
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
//enlazamiento con firebase
import { environment } from '../environments/environment';

// Auth service para autentificar el user
import { AuthService } from "./services/auth.service";



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//notificaciones
import { ToastrModule } from 'ngx-toastr';

//Form app
import { ShoppingHistoryComponent } from './components/shopping-history/shopping-history.component';
import { ShoppingListComponent } from './components/shopping-history/shopping-list/shopping-list.component';
import { ShoppingComponent } from './components/shopping-history/shopping/shopping.component';
import { ShoppingService } from './services/shopping.service';
import { ProductsComponent } from './components/products/products.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ShoppingHistoryComponent,
    ShoppingListComponent,
    ShoppingComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, ShoppingService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
