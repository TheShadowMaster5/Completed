import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth';
import { PlatformLocation,Location } from '@angular/common'
import { StorePicsProviderService } from '../../../Image_Provider/store-pics-provider.service';


@Component({
  selector: 'app-form-list-page',
  templateUrl: './form-list-page.component.html',
  styleUrls: ['./form-list-page.component.css']
})
export class FormListPageComponent implements OnInit {
  
  Type_Of_Activity:any[];
  Title:any[];
  Num_Of_Child:any;
  Data:any;
  Uid:any;
  DataLoad:any=false;
  constructor(
              private Router:Router, private AFDB:AngularFireDatabase, private AngularFireAuth:AngularFireAuth,
              private Platform:PlatformLocation,private location:Location,private render: Renderer2, private _zone: NgZone,
              private StorePicsProvider:StorePicsProviderService) { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                                this.Router.navigate(['/UserPage']);
                                                                           })
                                                     });

    this.Uid = this.AngularFireAuth.auth.currentUser.uid;           
    this.Retrieve_Data_From_Database();
  }
  
  Go_To_Filled_Forms(index)
  {
    var Form_Name = this.Getting_Forms_Name();
    this.Router.navigate(['/FilledForm',{Form_Name:Form_Name,Index:index}]);
  }

  Go_To_Forms()
  {
    this.Router.navigateByUrl("/Form");
  }

  Retrieve_Data_From_Database()
  {
    console.log("calling retrieve");
    var ref = this.AFDB.database.ref('Signup').child(this.Uid);
    ref.once("value", snapshot => {
                                   this.Data = snapshot.child('Revised_Fundtracker').val();
                                   var num = snapshot.child('Revised_Fundtracker').numChildren();
                                   this.Num_Of_Child = num;
                                   
                                   var Form_Names = this.Getting_Forms_Name();
                                   console.log(Form_Names);
                                   console.log(num);
                                   if(num>0)
                                   {
                                      this.Title = new Array(num);
                                      this.Type_Of_Activity = new Array(num);
                                   
                                      for(var i=0;i<num;i++)
                                      {
                                        this.Title[i]=snapshot.child('Revised_Fundtracker').child(Form_Names[i]).child('Title').val();
                                        this.Type_Of_Activity[i]=snapshot.child('Revised_Fundtracker').child(Form_Names[i]).child('Project_Type').val();
                                      }
                                    }
                                    this.DataLoad=true;
                                    
                                }, 
                      error => {
                                  console.log("Error: " + error.code);
                                }
          );
  }

  Delete_Data(index)
  {
    let Form = this.Getting_Forms_Name();
    console.log(index);
    console.log(Form);
    console.log(Form[index]);
    var ref = this.AFDB.database.ref("Signup")
                                .child(this.Uid)
                                .child("Revised_Fundtracker")
                                .child(Form[index].toString());
    ref.remove();
    this.Retrieve_Data_From_Database();
  }

  Getting_Forms_Name()
  {
     var FormNames:string[]=new Array();
     for(let i in this.Data)
     {
       FormNames.push(i);
     }
     return FormNames;
  }

  Logout()
  {
    this.AngularFireAuth.auth.signOut();
    this.Router.navigateByUrl("Login");
  }
}
