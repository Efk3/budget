import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';

const modules = [MatSidenavModule, MatToolbarModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatIconModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
