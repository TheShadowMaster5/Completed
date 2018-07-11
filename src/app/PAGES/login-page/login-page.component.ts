import { Component, OnInit, Renderer2, NgZone } from '@angular/core';;
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {NgModule} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {MatDialog,MatDialogRef,MatDialogConfig} from '@angular/material';
import { DialogComponent} from '../../Material/dialog/dialog.component';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit 
{

  Disable_Submit_Button:any = true;
  LoginForm:FormGroup;
  constructor(
               private FormBuilder:FormBuilder,private AngularFireAuth:AngularFireAuth,
               private Router:Router,private dialog:MatDialog,private AFDB:AngularFireDatabase,
               private render:Renderer2, private _zone:NgZone
             ) 
             { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                              this.Router.navigate(['nowhere']);
                                                                            })
                                                                        });
    this.LoginForm = this.FormBuilder.group({
                                              EmailId:[null,Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
                                              Password:[null,Validators.required]
                                            }
                                           )
  }


  Show_Message() 
  {
    const MatDialogRef = this.dialog.open(DialogComponent,{data:{Title:"Login Error",Message:"EmailId and Password does not match with register EmailId and Password"}});
  }

  LogIn(Values)
  {
    console.log("Enter login page");
    console.log(Values);
    var Email = Values.EmailId;
    var Password = Values.Password;
    
    if(Email!="" && Password!="")
    {
      let no_error = true;
      this.AngularFireAuth
         .auth
         .signInWithEmailAndPassword(Values.EmailId,Values.Password)
         .catch(info=>
                       {
                         no_error =false;
                         console.log(info);
                         this.Show_Message();
                       }
               ).then(Info=>{
                              console.log("no error "+no_error);
                              console.log(Info);
                              if(no_error==true)
                              {
                                let uid = this.AngularFireAuth.auth.currentUser.uid;
                                let ref = this.AFDB.database.ref("Signup").child(uid).child("Profile").child("Privilege");
                                ref.once('value')
                                  .then(User_Type=>{
                                                      if(User_Type.val()==="Admin")
                                                      {
                                                        this.Router.navigateByUrl("Admin");
                                                      }
                                                      else
                                                      {
                                                        this.Router.navigateByUrl("UserPage");
                                                      }
                                                    }
                                        )
                              }
                            }
                     )
    }
  }

}