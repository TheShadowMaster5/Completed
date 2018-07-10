import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatDialog,MatDialogRef, MatDialogConfig} from '@angular/material';
import { DialogComponent} from '../../Material/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  ForgotPassword: FormGroup;
  constructor(private FormBuilder:FormBuilder, private AngularFireAuth:AngularFireAuth,
              private dialog:MatDialog, private render: Renderer2,private _zone: NgZone, private Router:Router)  
  { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{
                                                        this._zone.run(() => {
                                                                                this.Router.navigate(['/Login'])
                                                                              }
                                                                      )
                                                      }
                      );

    this.ForgotPassword = this.FormBuilder
    .group(
            {
              EmailId:['',Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.required])]
            })
  }

  openDialog(Title,Message,TaskDone) 
  {
    const MatDialogRef = this.dialog.open(DialogComponent,{data:{Title,Message,TaskDone}});
  }

  Password_Recovery(Value)
  {
    console.log(Value);
    console.log(Value.EmailId);
    var message,error=false;
    this.AngularFireAuth
          .auth
          .sendPasswordResetEmail(Value.EmailId)
          .catch(()=>{
                        var Title = "Error"
                        var Message ="The EmailId is not register in the MIS.Please enter the registered EmailId";
                        //this.Show_Message(message,"Error")
                        error=true;
                        this.openDialog(Title,Message,false);
                      }
                )
          .then(()=>{
                      if(error==false)
                      {
                        var Title = "Successfull";
                        var Message = "Password recovery link have already send to your email. Please check your email."
                        this.openDialog(Title,Message,true);
                      }
                    }
               );
  }

}
