import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private AFDB:AngularFireDatabase, private AngularFireAuth:AngularFireAuth) { }
  Data:any;
  Get_Data()
  {
    let Uid = this.AngularFireAuth.auth.currentUser.uid;  
    console.log("calling retrieve");
    var ref = this.AFDB.database.ref('Signup').child(Uid);
    var data = ref.on("value", snapshot=>
                                        {
                                          let Data = snapshot.child('Revised_Fundtracker').val();
                                          var num = snapshot.child('Revised_Fundtracker').numChildren();
                                          let Num_Of_Child = num;
                                          let Title_And_Act = new Array(num);
                                          //let Type_Of_Activity = new Array(num);
                                          
                                          var Form_Names = this.Getting_Forms_Name(Data);
                                          console.log(Form_Names);
                                          console.log(num);
                                          if(num>0)
                                          {
                                              
                                              for(var i=0;i<num;i++)
                                              {
                                                Title_And_Act[i]["Title"]=snapshot.child('Revised_Fundtracker').child(Form_Names[i]).child('Title').val();
                                                Title_And_Act[i]["Activity"]=snapshot.child('Revised_Fundtracker').child(Form_Names[i]).child('Project_Type').val();
                                              }
                                          }
                                        }, 
                              error => {
                                          console.log("Error: " + error.code);
                                        }
                      );
    console.log("This data");
    console.log(data);
  
  }
  

  Getting_Forms_Name(Data)
  {
     var FormNames:string[]=new Array();
     for(let i in Data)
     {
       FormNames.push(i);
     }
     return FormNames;
  }

}
