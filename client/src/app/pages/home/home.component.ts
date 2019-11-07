import { Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../../product.model';
import { AllPrice, AppState } from '../../app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  allPrice$: Observable<AllPrice>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product | null>;

  private destroy$ = new Subject();

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.allPrice$ = this.appState.allPrice$;
    this.products$ = this.appState.products$;

    this.selectedProduct$ = this.appState.selectedProduct$;
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
