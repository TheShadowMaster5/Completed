import {MatButtonModule, MatCheckboxModule, MatFormFieldModule,MatInputModule,MatDialogModule, MatIconModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatDialogModule,MatIconModule,MatCardModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule],
  exports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatDialogModule,MatIconModule,MatCardModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule],
})
export class MaterialModule { }