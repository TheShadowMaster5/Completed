import { Component, OnInit, NgZone } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  constructor( private Router:Router,private AFDB:AngularFireDatabase, private AngularFireAuth:AngularFireAuth,
                private zone:NgZone
              ){}

  ngOnInit()
  {


    this.AngularFireAuth.auth
    .onAuthStateChanged(user=>
              {
                if(!user)
                  {
                    this.zone.run(()=>this.Router.navigate(["/Login"]));
                     
                  }
                  else
                  {
                    let ref = this.AFDB.database.ref("Signup").child(user.uid).child("Profile").child("Privilege");
                    
                      ref.once('value')
                         .then(User_Type=>{
                                            console.log(User_Type);
                                            if(User_Type.val()==="Admin")
                                            {
                                              this.zone.run(()=>this.Router.navigateByUrl("Admin"));
                                            }
                                            else
                                            {
                                              this.zone.run(()=>this.Router.navigateByUrl("UserPage"));
                                            }
                                          })
                     
                  }
              })

    // if(this.AngularFireAuth.auth.currentUser)
    // {
    //   console.log("uinside")
    //   let uid = this.AngularFireAuth.auth.currentUser.uid;
    //   let ref = this.AFDB.database.ref("Signup").child(uid).child("Profile").child("Privilege");
      
    //     ref.once('value')
    //        .then(User_Type=>{
    //                           if(User_Type.val()==="Admin")
    //                           {
    //                             this.Router.navigateByUrl("Admin");
    //                           }
    //                           else
    //                           {
    //                             this.Router.navigateByUrl("UserPage");
    //                           }
    //                         }
    //             )
    // }
    // console.log(this.AngularFireAuth.auth.currentUser);
  }
}
