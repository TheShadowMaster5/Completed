import {MatButtonModule, MatCheckboxModule, MatFormFieldModule,MatInputModule,MatDialogModule, MatIconModule, MatCardModule, MatSelectModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatDialogModule,MatIconModule,MatCardModule,MatSelectModule],
  exports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatDialogModule,MatIconModule,MatCardModule,MatSelectModule],
})
export class MaterialModule { }