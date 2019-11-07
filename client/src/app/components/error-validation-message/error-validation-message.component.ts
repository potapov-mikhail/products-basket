import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-validation-message',
  templateUrl: './error-validation-message.component.html',
  styleUrls: ['./error-validation-message.component.scss']
})
export class ErrorValidationMessageComponent {
  @Input() control: AbstractControl;
  messages = [
    {
      name: 'required',
      message: 'The field cannot be empty'
    },
    {
      name: 'email',
      message: 'Invalid email'
    },
    {
      name: 'minlength',
      message: 'Min length'
    }
  ];
}
