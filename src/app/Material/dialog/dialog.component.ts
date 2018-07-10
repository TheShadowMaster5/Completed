import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MatDialog,MAT_DIALOG_DATA} from '@angular/material';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

  
export class DialogComponent 
{
  Title:any;  
  Message:any;
  Color:any;
  Image:any;
  Nav;any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private Router:Router) 
  { 
    this.Title = data.Title;
    this.Message = data.Message;
    this.Nav = data.Navigate;
    console.log(data.TaskDone);
    if(data.TaskDone)
    {
      this.Color="accent"
      this.Image = "assets/Images/Sucess.jpg";
    }
    else
    {
      this.Color="warn";
      this.Image = "assets/Images/NotSuccess.png";
    }
  }

  Navigate()
  {
      this.Router.navigateByUrl(this.Nav);
  }
}
  

