import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from '../PAGES/login-page/login-page.component';
import { UserPageComponent } from '../PAGES/USER/user-page/user-page.component';
import { ForgotPasswordPageComponent } from '../PAGES/forgot-password-page/forgot-password-page.component';
import { SignupPageComponent } from '../PAGES/signup-page/signup-page.component';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';
import { FundtrackerSummaryComponent } from '../PAGES/USER/fundtracker-summary/fundtracker-summary.component';
import { AdminPagesComponent } from '../PAGES/ADMIN/admin-pages/admin-pages.component';
import { CollegewiseFundtrackerPageComponent } from '../PAGES/ADMIN/CollegeWisePage/collegewise-fundtracker-page/collegewise-fundtracker-page.component';
import { ConsolidatedFundtrackerPageComponent } from '../PAGES/ADMIN/consolidated-fundtracker-page/consolidated-fundtracker-page.component';
import { ActionPlanComponent } from '../PAGES/ADMIN/CollegeWisePage/action-plan/action-plan.component';
import { CollegeWisePageComponent } from '../PAGES/ADMIN/CollegeWisePage/college-wise-page/college-wise-page.component';
import { FormComponent } from '../PAGES/USER/form/form.component';
import { FormListPageComponent } from '../PAGES/USER/form-list-page/form-list-page.component';
import { FilledFormPagesComponent } from '../PAGES/USER/filled-form-pages/filled-form-pages.component';

const routes: Routes = 
[
  // {path:"", redirectTo:"/Login", pathMatch:"full"},
 {path:"Login", component:LoginPageComponent},
 //------------ User Page --------------------
    {path:"UserPage", component:UserPageComponent},
    {path:"FundtrackerSummary",component:FundtrackerSummaryComponent},
    {path:"FormList",component:FormListPageComponent},  
    {path:"Form",component:FormComponent},  
    {path:"FilledForm",component:FilledFormPagesComponent},  
 //--------------------------------------------

 //---------------Admin Page ----------------------
    {path:"Admin",component:AdminPagesComponent },
    {path:"show/:userid/:Type",component:ActionPlanComponent}, 
    {path:"Collegewise",component:CollegeWisePageComponent},  
    {path:"ftsummary/:userid/:Type",component:CollegewiseFundtrackerPageComponent},  
    {path:"ConsolidatedFundtracker",component:ConsolidatedFundtrackerPageComponent},
 //-------------------------------------------------

{path:"ForgotPassword",component:ForgotPasswordPageComponent},
{path:"SignUp",component:SignupPageComponent}
//  {path:"ReviseActionPlan",component:ReviseActionPlanFormComponent}
];
 
@NgModule({
 imports: [
   CommonModule,
   RouterModule.forRoot(routes)
 ],
 exports: [RouterModule],
 declarations: []
})

export class Routing {}
