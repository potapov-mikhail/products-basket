import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.scss']
})
export class ProductBasketComponent {
  @Input() count = 0;
  @Output() computed = new EventEmitter();

  compute() {
    this.computed.next();
  }
}
