import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AlertMessage, AlertService } from '../../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  message$: Observable<AlertMessage>;

  constructor(private service: AlertService) {
    this.message$ = this.service.message$;
  }
}
