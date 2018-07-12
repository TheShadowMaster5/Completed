import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpModule} from '@angular/http'

//----------------------Firebase Library----------------------
import{AngularFireModule} from 'angularfire2';
import{Angular_Firebase_Modules} from './Firebase/FirebaseModule';
//-----------------------------------------------------------

//----------------------Pages----------------------
  import {LoginPageComponent} from './PAGES/login-page/login-page.component';
  import { UserPageComponent } from './PAGES/USER/user-page/user-page.component';
  import { ForgotPasswordPageComponent } from './PAGES/forgot-password-page/forgot-password-page.component';
  import { SignupPageComponent } from './PAGES/signup-page/signup-page.component';
//---------------------------------------------------

//-----------------------FORMS -----------------------------
  import {ReactiveFormsModule, FormsModule} from '@angular/forms';
//----------------------------------------------------------

//-----------------------ROUTING -----------------------------
  import { Routing } from './routing/routing';
//----------------------------------------------------------

import 'rxjs/add/operator/map';

//-------------------MATERIAL-------------------------
  import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
  import {MaterialModule} from './Material/Material';
//---------------------------------------------------

import { AppComponent } from './app.component';
import { DialogComponent } from './Material/dialog/dialog.component';
import {PasswordValidation} from './CustomValidation/ConfirmPassword';
import { FtinfoService } from './SERVICE/Ftinfo/ftinfo.service';
import { FundGetterService } from './SERVICE/FundGetter/fund-getter.service';
import { FundtrackerSummaryComponent } from './PAGES/USER/fundtracker-summary/fundtracker-summary.component';
import { FormComponent } from './PAGES/USER/form/form.component';
import { AdminPagesComponent } from './PAGES/ADMIN/admin-pages/admin-pages.component';
import { CollegewiseFundtrackerPageComponent } from './PAGES/ADMIN/CollegeWisePage/collegewise-fundtracker-page/collegewise-fundtracker-page.component';
import { ConsolidatedFundtrackerPageComponent } from './PAGES/ADMIN/consolidated-fundtracker-page/consolidated-fundtracker-page.component';
import { ActionPlanComponent } from './PAGES/ADMIN/CollegeWisePage/action-plan/action-plan.component';
import { CollegeWisePageComponent } from './PAGES/ADMIN/CollegeWisePage/college-wise-page/college-wise-page.component';
import { GetIdService } from './SERVICE/GetId/get-id.service';
import { FormListPageComponent } from './PAGES/USER/form-list-page/form-list-page.component';
import { FilledFormPagesComponent } from './PAGES/USER/filled-form-pages/filled-form-pages.component';
 
var config = 
{
  apiKey: "AIzaSyAUJ7c6dbMQTKcI3CgNTk6OnXCSNe3gDVk",
  authDomain: "mis-app-2ac7c.firebaseapp.com",
  databaseURL: "https://mis-app-2ac7c.firebaseio.com",
  projectId: "mis-app-2ac7c",
  storageBucket: "mis-app-2ac7c.appspot.com",
  messagingSenderId: "410628398139"
};

@NgModule({
  declarations: 
  [
    AppComponent,LoginPageComponent, DialogComponent, UserPageComponent, 
    ForgotPasswordPageComponent, SignupPageComponent, 
    FundtrackerSummaryComponent, FormComponent, AdminPagesComponent,
    CollegewiseFundtrackerPageComponent, ConsolidatedFundtrackerPageComponent, 
    ActionPlanComponent, CollegeWisePageComponent,FormListPageComponent, 
    FilledFormPagesComponent
  ],
  
  imports: 
  [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    Angular_Firebase_Modules,
    ReactiveFormsModule, 
    Routing,
    BrowserAnimationsModule,
    MaterialModule,FormsModule
  ],
  
  providers: [PasswordValidation,FtinfoService,FundGetterService,GetIdService],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent]
})
export class AppModule { }
