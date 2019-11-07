import { Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {AllPrice, AppState} from './app.state';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  allPrice$: Observable<AllPrice>;
  products$: Observable<Product[]>;
  productCountInBasket$: Observable<number>;
  selectedProduct$: Observable<Product | null>;

  private destroy$ = new Subject();

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.allPrice$ = this.appState.allPrice$;
    this.products$ = this.appState.products$;
    this.productCountInBasket$ = this.appState.productCountInBasket$;
    this.selectedProduct$ = this.appState.selectedProduct$;
  }

  computeAllPrice() {
    this.appState.computeAllPrice();
  }

  buyProduct(product: Product) {
    this.appState.addProductInBasket(product);
  }

  deleteProduct(product: Product) {
    this.appState.removeProduct(product);
  }

  selectProduct(product: Product) {
    this.appState.selectProduct(product);
  }

  handleSubmit(product: Product) {
    if (product._id) {
     this.appState.updateProduct(product);
    } else {
      this.appState.addProduct(product);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
