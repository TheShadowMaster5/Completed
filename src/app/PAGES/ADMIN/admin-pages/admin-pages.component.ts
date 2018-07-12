import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  constructor(private AngularFireAuth:AngularFireAuth,private Router: Router,private render:Renderer2, private _zone:NgZone) { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                              this.Router.navigate(['Admin']);
                                                                            }
                                                                    )
                                                      }
                      );
  }

  Logout()
  {
    this.AngularFireAuth.auth.signOut();
    this.Router.navigateByUrl("Login");
  }
}
