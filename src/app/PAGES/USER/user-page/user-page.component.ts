import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {GetIdService} from '../../../SERVICE/GetId/get-id.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(
              private AngularFireAuth:AngularFireAuth, 
              private AFDB:AngularFireDatabase,private GetIdService:GetIdService,
              private render: Renderer2, private _zone: NgZone,private Router:Router
            ) { }
  id:any;
  ftlink:any;
  
  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                              
                                                                            })
                                                      });
    let uid = this.AngularFireAuth.auth.currentUser.uid;  
    console.log(uid);
    let ref = this.AFDB.database.ref("Signup").child(uid).child("email");
    ref.once('value')
    .then(Email_Id=>{
      console.log(Email_Id.val());
                      this.GetIdService.GetId(Email_Id.val())
                          .subscribe(Data=>{
                                              this.ftlink = Data[0].ftlink;
                                              this.id = Data[0].id;
                                            }
                                    )    
                    }
          )
  }

  Logout()
  {
    this.AngularFireAuth.auth.signOut();
    this.Router.navigateByUrl("Login");
  }
}
