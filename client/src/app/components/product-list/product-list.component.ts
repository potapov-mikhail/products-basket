import { Product } from '../../product.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() selectedProduct: Product;
  @Output() deleted = new EventEmitter<Product>();
  @Output() bayed = new EventEmitter<Product>();
  @Output() selected = new EventEmitter<Product>();

  handleSelected(product: Product) {
    if (this.selectedProduct && this.selectedProduct._id === product._id) {
      this.selected.emit(null);
    } else {
      this.selected.emit(product);
    }
  }

  handleBuy(product: Product) {
    this.bayed.emit(product);
  }

  handleDelete(product: Product) {
    this.deleted.emit(product);
  }

}
