import { Component, Input } from '@angular/core';
import {AllPrice} from '../../app.state';

@Component({
  selector: 'app-all-price',
  templateUrl: './all-price.component.html',
  styleUrls: ['./all-price.component.scss']
})
export class AllPriceComponent {
  @Input() allPrice: AllPrice;
}
