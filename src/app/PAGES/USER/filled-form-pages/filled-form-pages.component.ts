import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import {StorePicsProviderService} from '../../../Image_Provider/store-pics-provider.service';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent} from '../../../Material/dialog/dialog.component';

@Component({
  selector: 'app-filled-form-pages',
  templateUrl: './filled-form-pages.component.html',
  styleUrls: ['./filled-form-pages.component.css']
})
export class FilledFormPagesComponent implements OnInit {

  Project_Type:any;
  Title:any;
  Tentative_Duration:any;
  Tentative_Finish_Date:any;
  Tentative_Exp:any;
  Geo_tagged_Pics:any;
  Upload_In_Fundtracker_Form:any;
  Exp_June:any;
  Exp_July:any;
  Exp_Aug:any;
  Exp_Sept:any;
  Exp_Oct:any;
  Exp_Nov:any;
  Exp_Dec:any;
  Remarks:any;
  Form_Name:string;
  Operation_Type:any;
  Uid:any;
  Revise_Action_Plan_Form:FormGroup;

  constructor(
                private StorePicsProvider:StorePicsProviderService,private AFDB: AngularFireDatabase,
                private AngularFireAuth:AngularFireAuth,private Router:Router,
                private ActivatedRoute:ActivatedRoute, private render: Renderer2, 
                private _zone: NgZone, private FormBuilder:FormBuilder, private dialog:MatDialog
              ) 
              { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                                  this.Router.navigate(['/FormList']);
                                                                            })
                                                      });

    this.Revise_Action_Plan_Form = this.FormBuilder.group({
                                                        Project_Type:[null,Validators.required],
                                                        Title:[null,Validators.required],
                                                        Tentative_Duration:[null,Validators.required],
                                                        Tentative_Finish_Date:[null,Validators.required],
                                                        Tentative_Exp:[null,Validators.required],
                                                        Geo_tagged_Pics:[null,Validators.required],
                                                        Upload_In_Fundtracker_Form:[null,Validators.required],
                                                        Exp_June:[null,Validators.required],
                                                        Exp_July:[null,Validators.required],
                                                        Exp_Aug:[null,Validators.required],
                                                        Exp_Sept:[null,Validators.required],
                                                        Exp_Oct:[null,Validators.required],
                                                        Exp_Nov:[null,Validators.required],
                                                        Exp_Dec:[null,Validators.required]
                                                      });         
                                          
    this.Uid = this.AngularFireAuth.auth.currentUser.uid;
    this.ActivatedRoute.params
    .subscribe(params=>{
                          console.log(params);
                          this.Retrieve_Data_From_Database(params.Form_Name);
                       }
              );
  }

  Update_Data()
  {
    console.log("in upFinishDate"+this.Form_Name);
    var ref = this.AFDB.database.ref("Signup")
                                .child(this.Uid)
                                .child("Revised_Fundtracker")
                                .child(this.Form_Name);

                               
    ref.update({ 
                  Project_Type:this.Project_Type,
                  Title:this.Title,
                  Tentative_Duration:this.Tentative_Duration,
                  Tentative_Finish_FinishDate:this.Tentative_Finish_Date,
                  Tentative_Exp:this.Tentative_Exp,
                  Geo_tagged_Pics:this.Geo_tagged_Pics,
                  Upload_In_Fundtracker_Form:this.Upload_In_Fundtracker_Form,
                  Exp_June:this.Exp_June,
                  Exp_July:this.Exp_July,
                  Exp_Aug:this.Exp_Aug,
                  Exp_Sept:this.Exp_Sept,
                  Exp_Oct:this.Exp_Oct,
                  Exp_Nov:this.Exp_Nov,
                  Exp_Dec:this.Exp_Dec                
              }).then(()=>{
                            var ref = this.AFDB.database.ref("Signup")
                                        .child(this.Uid)
                                        .child("Revised_Fundtracker")
                                        .child(this.Form_Name)
                                        .child("Images");                    

                            ref.update(
                                        {
                                          Images:this.StorePicsProvider.Get_Pics()
                                        }
                                      ).then(()=>{
                                                    this.StorePicsProvider.Clear_All();
                                                    //this.AlertBox("Sucessfull");
                                                  }
                                            );
                          }).then(()=>this.Show_Message("Successfull","Sucessfully Uploaded Data",true))
                          .catch(error=>{
                                          this.Show_Message("Uploading Error","Error in Uploading Data Please Try Again",false)
                                        });   
    }

  Go_To_Gallery()
  {
    this.Router.navigateByUrl("Gallery");
  }

  Retrieve_Data_From_Database(formname)
  {
    this.Form_Name =formname;
    console.log("calling retrieve");
    var ref = this.AFDB.database.ref('Signup').child(this.Uid);
    ref.on("value", snapshot => {
                                  var Data = snapshot.child('Revised_Fundtracker').child(formname).val();
                                  console.log("Data"); console.log(Data);
                                  this.Project_Type = Data.Project_Type;
                                  this.Title = Data.Title;
                                  this.Tentative_Duration = Data.Tentative_Duration;
                                  this.Tentative_Finish_Date = Data.Tentative_finish_date;
                                  this.Tentative_Exp = Data.Tentative_Exp;
                                  this.Geo_tagged_Pics = Data.Geo_tagged_Pics;
                                  this.Upload_In_Fundtracker_Form = Data.Upload_In_Fundtracker_Form;
                                  this.Exp_June = Data.Exp_June;
                                  this.Exp_July = Data.Exp_July;
                                  this.Exp_Aug = Data.Exp_Aug;
                                  this.Exp_Sept = Data.Exp_Sept;
                                  this.Exp_Oct = Data.Exp_Oct;
                                  this.Exp_Nov= Data.Exp_Nov;
                                  this.Exp_Dec = Data.Exp_Dec;

                                  if(Data.Images.Images!="No Image")
                                  {
                                    for(var i=0;i<Data.Images.Images.length;i++)
                                    {
                                        this.StorePicsProvider.Store_Pics_Camera(Data.Images.Images[i]);
                                    }
                                  }
                                }, 
                      error => {
                                  console.log("Error: " + error.code);
                                }
          );
  }

  Show_Message(Title,Message,TaskDone) 
  {
    const MatDialogRef = this.dialog.open(DialogComponent,{data:{Title:Title,Message:Message,TaskDone,Navigate:"FormList"}});
  }
}
