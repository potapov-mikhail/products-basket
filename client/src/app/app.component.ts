import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AppState} from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  productCountInBasket$: Observable<number>;

  constructor(private router: Router,
              private appState: AppState) {

    this.productCountInBasket$ = this.appState.productCountInBasket$;
  }

  async computeAllPrice() {
    await this.appState.computeAllPrice();
    this.router.navigate(['/home']);
  }
}
