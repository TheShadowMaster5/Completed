import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import {StorePicsProviderService} from '../../../Image_Provider/store-pics-provider.service';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent} from '../../../Material/dialog/dialog.component';
import { Location } from '@angular/common';
declare let cordova: any;
declare let navigator: any;
let device;


@Component({
  selector: 'app-filled-form-pages',
  templateUrl: './filled-form-pages.component.html',
  styleUrls: ['./filled-form-pages.component.css']
})
export class FilledFormPagesComponent implements OnInit {

  Form_Name:string;
  Uid:any;
  Revise_Action_Plan_Form:FormGroup;
  images:any;

  constructor(
                private StorePicsProvider:StorePicsProviderService,private AFDB: AngularFireDatabase,
                private AngularFireAuth:AngularFireAuth,private Router:Router,
                private ActivatedRoute:ActivatedRoute, private render: Renderer2, 
                private _zone: NgZone, private FormBuilder:FormBuilder,
                 private dialog:MatDialog,private Location:Location
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
                          console.log(params.Form_Name);
                          console.log(params.Form_Name[0]);
                          var Form_name = params.Form_Name.split(",",params.Index+1);
                          this.Retrieve_Data_From_Database(Form_name[params.Index]);
                          
                       }
              );
  }

  Update_Data(Form_Data)
  {
    console.log("in upFinishDate"+this.Form_Name);
    var ref = this.AFDB.database.ref("Signup")
                                .child(this.Uid)
                                .child("Revised_Fundtracker")
                                .child(this.Form_Name);

                               
    ref.update({ 
                  Project_Type:Form_Data.Project_Type,
                  Title:Form_Data.Title,
                  Tentative_Duration:Form_Data.Tentative_Duration,
                  Tentative_finish_date:Form_Data.Tentative_Finish_Date,
                  Tentative_Exp:Form_Data.Tentative_Exp,
                  Geo_tagged_Pics:Form_Data.Geo_tagged_Pics,
                  Upload_In_Fundtracker_Form:Form_Data.Upload_In_Fundtracker_Form,
                  Exp_June:Form_Data.Exp_June,
                  Exp_July:Form_Data.Exp_July,
                  Exp_Aug:Form_Data.Exp_Aug,
                  Exp_Sept:Form_Data.Exp_Sept,
                  Exp_Oct:Form_Data.Exp_Oct,
                  Exp_Nov:Form_Data.Exp_Nov,
                  Exp_Dec:Form_Data.Exp_Dec         
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
    if( navigator != undefined)
    {
      navigator.camera.getPicture(
        (imageData) => {
                          let image = "data:image/jpeg;base64," + imageData; 
                          this.StorePicsProvider.Store_Pics_Camera(image);
                          this._zone.run(()=>{this.images = this.StorePicsProvider.Get_Pics()});
                        },
        (error) =>{},
        {
          quality: 100,
          targetHeight:100,
          targetWidth:100,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          //mediaType: navigator.camera.MediaType.PHOTOLIBRARY,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
      )
    }
  }
  

  Retrieve_Data_From_Database(formname)
  {
    this.Form_Name =formname;
    console.log(formname);
    console.log("calling retrieve");
    var ref = this.AFDB.database.ref('Signup').child(this.Uid);
    ref.once("value", snapshot => {
                                  var Data = snapshot.child('Revised_Fundtracker').child(formname).val();
                                  console.log("Data"); console.log(Data);
                                  this.Revise_Action_Plan_Form.get('Project_Type').setValue(Data.Project_Type);
                                  this.Revise_Action_Plan_Form.get('Title').setValue(Data.Title);
                                 this.Revise_Action_Plan_Form.get('Tentative_Duration').setValue(Data.Tentative_Duration);
                                  this.Revise_Action_Plan_Form.get('Tentative_Finish_Date').setValue(Data.Tentative_finish_date);
                                  this.Revise_Action_Plan_Form.get('Tentative_Exp').setValue(Data.Tentative_Exp);
                                  this.Revise_Action_Plan_Form.get('Geo_tagged_Pics').setValue(Data.Geo_tagged_Pics);
                                  this.Revise_Action_Plan_Form.get('Upload_In_Fundtracker_Form').setValue(Data.Upload_In_Fundtracker_Form);
                                  this.Revise_Action_Plan_Form.get('Exp_June').setValue(Data.Exp_June);
                                  this.Revise_Action_Plan_Form.get('Exp_July').setValue(Data.Exp_July);
                                  this.Revise_Action_Plan_Form.get('Exp_Aug').setValue(Data.Exp_Aug);
                                  this.Revise_Action_Plan_Form.get('Exp_Sept').setValue(Data.Exp_Sept);
                                  this.Revise_Action_Plan_Form.get('Exp_Oct').setValue(Data.Exp_Oct);
                                  this.Revise_Action_Plan_Form.get('Exp_Nov').setValue(Data.Exp_Nov);
                                  this.Revise_Action_Plan_Form.get('Exp_Dec').setValue(Data.Exp_Dec);

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
    MatDialogRef.afterClosed().subscribe(()=>this.Router.navigateByUrl("FormList"));
  }
}
