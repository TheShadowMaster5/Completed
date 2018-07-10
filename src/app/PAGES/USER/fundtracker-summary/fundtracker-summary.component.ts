import { Component,OnInit} from '@angular/core';
import { FundGetterService } from '../../../SERVICE/FundGetter/fund-getter.service';
import { FtinfoService } from '../../../SERVICE/Ftinfo/ftinfo.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-fundtracker-summary',
  templateUrl: './fundtracker-summary.component.html',
  styleUrls: ['./fundtracker-summary.component.css']
})
export class FundtrackerSummaryComponent implements OnInit 

{

  films = [];
  filmResource:any;
  projects=[];
  projectCount = 0;
  projecttypes:any={"data":[{"_id":"58a17d0faff4ed67dbd494ec","name":"Construction / Creation of New Facilities"},{"_id":"58a17d32aff4ed67dbd494ef","name":"Renovation/Upgradation of Existing Facilities"},{"_id":"58a17d48aff4ed67dbd494f1","name":"New Equipments"},{"_id":"58a81f5bdb7d4346a9956a39","name":"Others"}],"value":true};
  assettypes:any={"data":[{"_id":"58a17ec2aff4ed67dbd49564","name":"Academic Buildings"},{"_id":"58a17ecaaff4ed67dbd49566","name":"Administrative Buildings"},{"_id":"58a17ed4aff4ed67dbd49568","name":"Auditorium"},{"_id":"58a17ee2aff4ed67dbd4956c","name":"Books/Journals/E-Resources"},{"_id":"58a17eeeaff4ed67dbd4956e","name":"Boys Hostel"},{"_id":"58a17ef6aff4ed67dbd49570","name":"Boys Toilet"},{"_id":"58a17effaff4ed67dbd49578","name":"Campus development"},{"_id":"58a17f1baff4ed67dbd4957b","name":"Campus development - Alternate Energy Sources"},{"_id":"58a17f23aff4ed67dbd4957d","name":"Campus development - Amenities"},{"_id":"58a17f31aff4ed67dbd4957f","name":"Campus development - Beautification"},{"_id":"58a17f44aff4ed67dbd49582","name":"Campus development - Drainage"},{"_id":"58a17f4faff4ed67dbd49584","name":"Campus development - Playgrounds"},{"_id":"58a17f70aff4ed67dbd49588","name":"Campus development - Water Harvesting"},{"_id":"58a17f7baff4ed67dbd4958a","name":"Campus development - Water Supply"},{"_id":"58a17f83aff4ed67dbd4958c","name":"Canteen/Cafeteria"},{"_id":"58a17f8caff4ed67dbd4958f","name":"Classrooms"},{"_id":"58a17f95aff4ed67dbd49595","name":"Common Room for Students"},{"_id":"58a17f9faff4ed67dbd49597","name":"Computer Centre"},{"_id":"58a17fa8aff4ed67dbd4959a","name":"Computers"},{"_id":"58a17fafaff4ed67dbd4959c","name":"Girls Hostel"},{"_id":"58a17fb8aff4ed67dbd4959e","name":"Girls Toilet"},{"_id":"58a17fc2aff4ed67dbd495a1","name":"Laboratory"},{"_id":"58a17fcaaff4ed67dbd495a4","name":"Library"},{"_id":"58a17fd2aff4ed67dbd495a7","name":"Sports facility"},{"_id":"58a81f8ddb7d4346a9956a3e","name":"Others"}],"value":true};
  
  projecttype:any;
  projectvalue:any;
  assettype:any;
  remarks:any;
  exp:any;
  totalexp:any=0;
  projectexpense:any;
  
  data:any;
  duedate:any;
  expconst:any=0;
  expren:any=0;
  expeqp:any=0;
  expoth:any=0;
  collegename:any;
  
  constructor(private getfundgetter:FundGetterService,private ftinfo: FtinfoService,private router: Router,
              private route: ActivatedRoute) {  }
    
  ngOnInit()
  {
    var id = this.route.snapshot.params['userid']; 
    console.log(id);
    // STEP:1 :- The service will provides us the colleges uid in the database
    // STEP:2 :- The service will provides the id use for retreiving data 
       this.ftinfo
           .Retrieve_All_Transaction_Data(id,"1")
           .subscribe(
                        All_Transaction_Data=>
                        {
                          this.ftinfo
                              .Merging_Two_API(All_Transaction_Data,id)
                              .subscribe(
                                          Data=>
                                                {
                                                  console.log("DATA");
                                                  
                                                  this.collegename = Data[0].Cllg_Name;
                                                  var Project:any[] = new Array();
                                                              
                                                  for(var i in Data)
                                                  {
                                                    var Project_Id = Data[i].Project_Id;
                                                               
                                                    Project.push(Project_Id);
                                                                
                                                    if(Project.length>1)
                                                    {
                                                      for(var j=0;j<Project.length-1;j++)
                                                      {
                                                        if(Project[j]==Project_Id)
                                                        {
                                                          Project.pop();
                                                        }
                                                      }
                                                    }
                                                  }

                                                
                                                  for (var i in Project) 
                                                  {
                                                    this.exp=0;
                                                    this.projectexpense=0;
                                                                
                                                    for(var m in Data)
                                                    {
                                                      if(Data[m].Project_Id==Project[i])
                                                      {
                                                        this.projectexpense = this.projectexpense+(parseInt(Data[m].Amount)||0);
                                                        //this.exp=this.exp+(parseInt(Data[m].Amount)||0);
                                                                  
                                                        //------------------Project Type ---------------------------
                                                            for(var k in this.projecttypes.data)
                                                            {
                                                              if(this.projecttypes.data[k]._id===Data[m].Project_type)
                                                              {
                                                                this.projecttype = this.projecttypes.data[k].name;
                                                              }
                                                            } 
                                                         //-----------------------------------------------------------

                                                         //------------------ Asset Type -----------------------------
                                                            for(var l in this.assettypes.data)
                                                            {  
                                                              if(this.assettypes.data[l]._id===Data[m].Asset_Type)
                                                              {
                                                                this.assettype=this.assettypes.data[l].name;
                                                              }
                                                            }
                                                          //----------------------------------------------------------

                                                          //--------------- Project Value ----------------------------
                                                            this.projectvalue = Data[m].Project_Value;
                                                            this.exp = Data[m].Exp_Till_Now;
                                                          //----------------------------------------------------------

                                                          //------------------Due Date------------------------------
                                                            this.duedate = Data[m].Exp_Finish_Date;
                                                            var date = new Date(this.duedate); // had to remove the colon (:) after the T in order to make it work
                                                            var day = date.getDate();
                                                            var monthIndex = date.getMonth();
                                                            var year = date.getFullYear();
                                                            this.duedate = day+"-"+(monthIndex+1)+"-"+year;
                                                          //--------------------------------------------------------     
                                                                    
                                                                    
                                                          if(this.projecttype=="Construction / Creation of New Facilities")
                                                          {
                                                            this.expconst= this.expconst + parseInt((Data[m].Amount)||0);
                                                          }
                                                          else if(this.projecttype=="Renovation/Upgradation of Existing Facilities")
                                                          {
                                                            this.expren = this.expren+parseInt((Data[m].Amount)||0);
                                                          }
                                                          else if(this.projecttype=="New Equipments")     
                                                          {
                                                            this.expeqp = this.expeqp + parseInt((Data[m].Amount)||0);
                                                          } 
                                                          else     
                                                          {
                                                            this.expoth = this.expoth + parseInt((Data[m].Amount)||0);
                                                          } 
                                                                    
                                                            this.totalexp = this.totalexp + parseInt((Data[m].Amount)||0);  

                                                      }
                                                    }
                                                                this.projects.push({"valueofproject": this.projectvalue,"projecttype":this.projecttype,"assettype":this.assettype,"totalprojectexpenses":this.projectexpense
                                                                                                      ,"exp":this.exp, "fd":this.duedate,"remarks":this.remarks });   
                                                  }
                                                }
                                              );
                        }
                      );
  }
}
