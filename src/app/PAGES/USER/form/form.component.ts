import { Component, OnInit, ViewEncapsulation, NgZone, Renderer2 } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {StorePicsProviderService} from '../../../Image_Provider/store-pics-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent} from '../../../Material/dialog/dialog.component';
declare let cordova: any;
declare let navigator: any;
let device;

@Component({
  encapsulation:ViewEncapsulation.Emulated,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  count:any;
  images:any;
  public base64Image : String;

  Revise_Action_Plan_Form:FormGroup;
  constructor(private FormBuilder:FormBuilder,private AngularFireAuth:AngularFireAuth,
              private AFDB:AngularFireDatabase, private StorePicsProvider:StorePicsProviderService,
              private Router:Router, private ActivatedRout:ActivatedRoute, private render: Renderer2, 
              private _zone: NgZone, private dialog:MatDialog) { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                                  this.Router.navigate(['/FormList']);
                                                                            })
                                                      });
    var Data = new Array();
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
      
  }

  Count_Child(Form_Data)
  {
    let Uid = this.AngularFireAuth.auth.currentUser.uid;
    var ref = this.AFDB.database.ref('Signup').child(Uid);
    ref.once("value", snapshot  => {
                                      this.count = snapshot.child('Revised_Fundtracker').numChildren();
                                    if(this.count==0)
                                    {
                                      this.count=0;
                                    }
                                    else
                                    {
                                      var arr:any[] = snapshot.child('Revised_Fundtracker').val();
                                      for(var formname in arr)
                                      {
                                        var name = formname;
                                      }
                                      
                                      this.count = Number(name.slice(24));
                                      console.log('count'+this.count);
                                    }
                                  },
                                   
                        error =>  {
                                    console.log("Error: " + error.code);
                                  }
            ).then(()=>{
                          this.Upload_Data(this.count+1,Form_Data,Uid);
                        });
  }

  Upload_Data(Num_of_child,Form_Data,Uid)
  {
    console.log("numofchild "+Num_of_child);
    console.log("Inside upload data");
    console.log(Form_Data);
    var ref = this.AFDB.database.ref("Signup")
                                .child(Uid)
                                .child("Revised_Fundtracker")
                                .child("Revised_Fundtracker_Form"+Num_of_child);
                                
    ref.set(  
             { 
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
             }
           ).then(()=>{
                        var img = this.AFDB.database.ref("Signup").child(Uid).child("Revised_Fundtracker").child("Revised_Fundtracker_Form"+Num_of_child).child('Images');
                        img.set(
                                  {
                                      Images:this.StorePicsProvider.Get_Pics()
                                  }
                              );
                      }
                 ).then(()=>this.Show_Message("Successfull","Sucessfully Uploaded Data",true))
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
  
  Show_Message(Title,Message,TaskDone) 
  {
    const MatDialogRef = this.dialog.open(DialogComponent,{data:{Title:Title,Message:Message,TaskDone}});
    MatDialogRef.afterClosed().subscribe(()=>this.Router.navigateByUrl("FormList"));
  }
}
