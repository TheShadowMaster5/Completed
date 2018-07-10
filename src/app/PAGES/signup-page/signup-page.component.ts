import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import {FormGroup,FormBuilder,Validators,Validator} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {PasswordValidation} from '../../CustomValidation/ConfirmPassword';
import { AngularFireDatabase } from 'angularfire2/database';
import { DialogComponent} from '../../Material/dialog/dialog.component';
import {MatDialog,MatDialogRef,MatDialogConfig} from '@angular/material';
import { PlatformLocation, Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit 
{
  
  Disable_Submit_Button:any = true;
  SignUpForm:FormGroup;
  
  constructor( private FormBuilder:FormBuilder,private AngularFireAuth:AngularFireAuth,
               private AFDB:AngularFireDatabase,private dialog:MatDialog,private Platform:PlatformLocation,
                private Loacation:Location, private Router:Router,private render: Renderer2,
                private _zone: NgZone) 
  { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                              this.Router.navigate(['/Login'])
                                                                          })
                                                      })

    this.SignUpForm = this.FormBuilder.group({
                                                FirstName:[null,Validators.required],
                                                LastName:[null,Validators.required],
                                                Contact:[null,Validators.compose([Validators.required,Validators.minLength(10),Validators.required,Validators.maxLength(10)])],
                                                EmailId:[null,Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
                                                Password:[null,Validators.compose([Validators.required,Validators.minLength(6)])],
                                                ConfirmPassword:[null,Validators.required]
                                              },
                                              {
                                                validator:PasswordValidation.MatchPassword
                                              }
                                            )
  }

  SignUp(Values)
  {
    var no_error = true;
    this.AngularFireAuth.auth.createUserWithEmailAndPassword(Values.EmailId,Values.Password)
        .catch(
                Info=>{
                          var Title="ERROR";
                          var Message = "The Email Address Is Already Register";  
                          this.Show_Message(Title,Message,false);
                       }
               ).then(Info=>{
                               if(no_error==true)
                               {
                                var uid = Info['user']['uid'];
                                
                                this.Insert_Data_To_Database(Values,uid);
                               
                                 console.log("SignUp Sucessfully")
                               }
                            }
                      );
    
  }


  Insert_Data_To_Database(Form_Values,Uid)
  {
    console.log(Form_Values);
    console.log(Uid);
    var ref = this.AFDB.database.ref("Signup").child(Uid);
    ref.set(  
             { 
                First_Name: Form_Values.FirstName,
                Last_Name: Form_Values.LastName, 
                Contact:Form_Values.Contact,
                email: Form_Values.EmailId, 
                UserImage:"",
                Privilege:"user"
              }
            ).then(()=>{ 
                          var Title="SUCCESS";
                          var Message = "Successfully Register To The MIS";  
                          this.Show_Message(Title,Message,true);
                        }
                  )
  }

  Show_Message(Title,Message,TaskDone) 
  {
    const MatDialogRef = this.dialog.open(DialogComponent,{data:{Title,Message,TaskDone}});
  }

}
