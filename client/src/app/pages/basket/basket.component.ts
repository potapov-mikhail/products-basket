import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AppState } from '../../app.state';
import { Basket } from '../../product.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  basket$: Observable<Basket[]>;

  constructor(private appState: AppState) {
    this.basket$ = appState.basket$;
  }

  handlePlus(basketItem: Basket) {
    this.appState.addProductInBasket(basketItem);
  }

  handleMinus(basketItem: Basket) {
    this.appState.removeProductFromBasket(basketItem);
  }

}
