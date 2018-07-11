import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  constructor(private AngularFireAuth:AngularFireAuth,private Router:Router) { }

  ngOnInit() {
  }

  Logout()
  {
    this.AngularFireAuth.auth.signOut().then(()=>{this.Router.navigateByUrl("Login")})
  }
}
