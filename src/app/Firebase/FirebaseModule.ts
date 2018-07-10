import {NgModule} from '@angular/core';
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  imports: [AngularFireAuthModule,AngularFireDatabaseModule],
  exports: [AngularFireAuthModule,AngularFireDatabaseModule],
})
export class Angular_Firebase_Modules{ }