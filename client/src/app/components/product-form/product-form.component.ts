import { Product } from '../../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input('product') set setProduct(product: Product) {
    this.product = product;

    if (product) {

      this.form.setValue({
        name: product.name,
        currency: product.currency,
        price: product.price
      });

      this.btnName = 'Update product';
    } else {
      this.defaultState();
      this.btnName = 'Add product';
    }

  }

  @Output() submitted = new EventEmitter<Product>();

  form: FormGroup;
  product: Product;
  currencyList = ['RUB', 'EUR', 'USD'];
  btnName = 'Add product';

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      currency: ['RUB', Validators.required],
      price: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {

      const formValues = this.form.value;
      const product = this.product ? {...this.product, ...formValues} : formValues;

      this.submitted.emit(product);
      this.defaultState();
    }
  }

  private defaultState() {
    this.form.reset();
    this.form.get('currency').setValue('RUB');
  }

}
