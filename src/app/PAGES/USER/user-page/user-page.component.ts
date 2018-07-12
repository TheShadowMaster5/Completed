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
  id:any="";
  ftlink:any="";
  
  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                               this.Router.navigate(['nowhere']);
                                                                            })
                                                      });
    let uid = this.AngularFireAuth.auth.currentUser.uid;  
    console.log(uid);
    let ref = this.AFDB.database.ref("Signup").child(uid).child("company");
    ref.once('value')
    .then(Company=>{
                     this.GetIdService.GetCompany()
                          .subscribe(Data=>{
                                             if(Company.val()!="")
                                              {
                                                for(let i=0;i<Data.length;i++)
                                                {
                                                  if(Company.val()==Data[i].company)
                                                  {
                                                    this.ftlink = Data[i].ftlink;
                                                    this.id = Data[i].id;
                                                  }
                                                }
                                              }
                                            }
                                    )    
                    }
          )
          this._zone.run(()=>{this.ftlink = this.ftlink;
                              this.id = this.id;})
  }

  Logout()
  {
    this.AngularFireAuth.auth.signOut();
    this.Router.navigateByUrl("Login");
  }
}
