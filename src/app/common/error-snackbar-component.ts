import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  template: `<span>{{ message }}</span><i class="fas fa-exclamation-circle"></i>`,
  styles: [
    `
    :host {
      color: #c2185b;
    }
    svg {
      float: right;
    }
  `,
  ],
})
export class ErrorSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}
}
