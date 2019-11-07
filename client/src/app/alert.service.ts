import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertMessage {
  text: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private timeId;
  // tslint:disable-next-line:variable-name
  private _message = new BehaviorSubject<AlertMessage>(null);

  get message$(): Observable<AlertMessage> {
    return this._message.asObservable();
  }

  success(message: string) {
    this._message.next({ text: message, type: 'success' });
    this.clearWithTimeout();
  }

  error(message: string) {
    this._message.next({ text: message, type: 'danger' });
    this.clearWithTimeout();
  }

  clearWithTimeout() {
    clearInterval(this.timeId);
    this.timeId = setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this._message.next(null);
  }
}
