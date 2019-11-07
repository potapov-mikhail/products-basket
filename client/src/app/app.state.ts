import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Basket, Product } from './product.model';
import { ProductService } from './product.service';
import { AlertService } from './alert.service';

export interface AllPrice {
  RUB: number;
  EUR: number;
  USD: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppState {

  basket = new BehaviorSubject<Basket[]>([]);
  products = new BehaviorSubject<Product[]>([]);
  selectedProduct = new BehaviorSubject<Product>(null);
  allPrice = new BehaviorSubject<AllPrice>(null);

  constructor(private alertService: AlertService,
              private productService: ProductService) {
    this.loadAllProducts();
  }

  get products$(): Observable<Product[]> {
    return this.products.asObservable();
  }

  get selectedProduct$(): Observable<Product> {
    return this.selectedProduct.asObservable();
  }

  get productCountInBasket$(): Observable<number> {
    return this.basket.asObservable().pipe(
      map(basketItems => basketItems.reduce((acc, value) => {
        return acc + value.quantity;
      }, 0))
    );
  }

  get allPrice$(): Observable<AllPrice> {
    return this.allPrice.asObservable();
  }

  selectProduct(product: Product) {
    this.selectedProduct.next(product);
  }

  async addProduct(product: Product) {
    try {
      await this.productService.createProduct(product);
      await this.loadAllProducts();
      this.alertService.success('Product has been created');
    } catch (e) {
      this.alertService.error('Sorry Product was not created');
      throw e;
    }

  }

  async removeProduct(product: Product) {
    try {
      await this.productService.deleteProductById(product._id);

      const selected = this.selectedProduct.getValue();
      if (selected && selected._id === product._id) {
        this.selectedProduct.next(null);
      }

      await this.loadAllProducts();
      this.alertService.success('Product has been removed');
    } catch (e) {
      this.alertService.error('Sorry Product was not removed');
      throw e;
    }
  }

  async updateProduct(product: Product) {
    try {
      await this.productService.updateProduct(product);
      this.selectedProduct.next(null);
      await this.loadAllProducts();
      this.alertService.success('Product has been updated');
    } catch (e) {
      this.alertService.error('Sorry Product was not updated');
      throw e;
    }
  }

  async computeAllPrice() {
    try {
      const basketItems = this.basket.getValue();
      if (!basketItems.length) {

        this.alertService.error('Product basket is empty');
        return;
      }

      const response = await this.productService.computeAllPrice<AllPrice>(basketItems);
      this.allPrice.next(response);
      this.alertService.success(`All Price was been computed`);
    } catch (e) {
      this.alertService.error('Sorry All price was not computed');
      throw e;
    }
  }

  addProductInBasket(product: Product) {
    const basketItems = this.basket.getValue();
    const index = basketItems.findIndex(item => item._id === product._id);

    if (index !== -1) {
      const quantity = basketItems[index].quantity + 1;
      basketItems[index] = {...basketItems[index], quantity};
    } else {
      basketItems.push({...product, quantity: 1});
    }

    this.basket.next(basketItems);
    this.allPrice.next(null);
  }

  async loadAllProducts() {
    const products = await this.productService.getAllProduct().toPromise();
    this.products.next(products);
  }

}
