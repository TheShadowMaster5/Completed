import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';
import {FundGetterService} from '../../../SERVICE/FundGetter/fund-getter.service';
import {FtinfoService} from '../../../SERVICE/Ftinfo/ftinfo.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-consolidated-fundtracker-page',
  templateUrl: './consolidated-fundtracker-page.component.html',
  styleUrls: ['./consolidated-fundtracker-page.component.css']
})
export class ConsolidatedFundtrackerPageComponent implements OnInit 
{

  projecttypes:any={"data":[{"_id":"58a17d0faff4ed67dbd494ec","name":"Construction / Creation of New Facilities"},{"_id":"58a17d32aff4ed67dbd494ef","name":"Renovation/Upgradation of Existing Facilities"},{"_id":"58a17d48aff4ed67dbd494f1","name":"New Equipments"},{"_id":"58a81f5bdb7d4346a9956a39","name":"Others"}],"value":true};
   assettypes:any={"data":[{"_id":"58a17ec2aff4ed67dbd49564","name":"Academic Buildings"},{"_id":"58a17ecaaff4ed67dbd49566","name":"Administrative Buildings"},{"_id":"58a17ed4aff4ed67dbd49568","name":"Auditorium"},{"_id":"58a17ee2aff4ed67dbd4956c","name":"Books/Journals/E-Resources"},{"_id":"58a17eeeaff4ed67dbd4956e","name":"Boys Hostel"},{"_id":"58a17ef6aff4ed67dbd49570","name":"Boys Toilet"},{"_id":"58a17effaff4ed67dbd49578","name":"Campus development"},{"_id":"58a17f1baff4ed67dbd4957b","name":"Campus development - Alternate Energy Sources"},{"_id":"58a17f23aff4ed67dbd4957d","name":"Campus development - Amenities"},{"_id":"58a17f31aff4ed67dbd4957f","name":"Campus development - Beautification"},{"_id":"58a17f44aff4ed67dbd49582","name":"Campus development - Drainage"},{"_id":"58a17f4faff4ed67dbd49584","name":"Campus development - Playgrounds"},{"_id":"58a17f70aff4ed67dbd49588","name":"Campus development - Water Harvesting"},{"_id":"58a17f7baff4ed67dbd4958a","name":"Campus development - Water Supply"},{"_id":"58a17f83aff4ed67dbd4958c","name":"Canteen/Cafeteria"},{"_id":"58a17f8caff4ed67dbd4958f","name":"Classrooms"},{"_id":"58a17f95aff4ed67dbd49595","name":"Common Room for Students"},{"_id":"58a17f9faff4ed67dbd49597","name":"Computer Centre"},{"_id":"58a17fa8aff4ed67dbd4959a","name":"Computers"},{"_id":"58a17fafaff4ed67dbd4959c","name":"Girls Hostel"},{"_id":"58a17fb8aff4ed67dbd4959e","name":"Girls Toilet"},{"_id":"58a17fc2aff4ed67dbd495a1","name":"Laboratory"},{"_id":"58a17fcaaff4ed67dbd495a4","name":"Library"},{"_id":"58a17fd2aff4ed67dbd495a7","name":"Sports facility"},{"_id":"58a81f8ddb7d4346a9956a3e","name":"Others"}],"value":true};
   projecttype:any;
    
  //----------- Arrays ----------------
     collegename:any[];
     ExpConstArr : Number[];
     ExpRenArr : Number[];
     ExpEqpArr : Number [];
     Others : Number [];
     TotalExp : number[];
     Fundtracker_Rusa_Cllg_Id :any[];
  //------------------------------------
  
  //---------- Global Variables --------
    innercount:any=-1;
  //------------------------------------

  constructor(private getfundgetter:FundGetterService,private ftinfo:FtinfoService,
              private route:ActivatedRoute) 
  {}

  ngOnInit() 
  {
    // STEP:1 :- The service will provides us the colleges uid and Total number of colleges
    // present in the database. We will pass uid i.e (id) to service in STEP:2 
     
    this.getfundgetter.getfundgettingcolleges()
        .subscribe(Cllg => 
    { 
      //---------- Creating the arrays --------------- 
        this.collegename = new Array(Cllg.length); 
        this.ExpConstArr = new Array(Cllg.length);
        this.ExpEqpArr = new Array(Cllg.length);
        this.ExpRenArr = new Array(Cllg.length);
        this.Others = new Array(Cllg.length);
        this.TotalExp =  new Array(Cllg.length);
        this.Fundtracker_Rusa_Cllg_Id = new Array(Cllg.length);
      //---------------------------------------------

      for( var index=0;index<Cllg.length;index++)
      {
       
        this.ftinfo
            .Retrieve_All_Transaction_Data(Cllg[index].ftlink,index)
            .subscribe(
                        // The data contains the all tranaction data of a particular college    
                        All_Transactions_Data=>  
                        {
                           var index = All_Transactions_Data.data.index;
                          //STEP:4 :- The service compare the data of 2 api one is all transaction and 
                          // another is getone on the base of project expense ID and return an array of data.
                          
                          this.ftinfo
                              .Merging_Two_API(All_Transactions_Data,Cllg[index].ftlink)                       
                              .subscribe(
                                          // The Data is the final data with all ingredients required
                                          // for computing  results
                                          Data_Arr=>
                                          {
                                            //Step:5 calling the calculate function
                                            this.Calculate(Data_Arr);
                                          }
                                        );
                        }
                      );
      }
    }
                         );        
  }

  private Calculate(Data_Arr)
  {
    this.innercount++;
    //var res = All_Transactions_Data;
                                                      
    this.collegename[this.innercount] = Data_Arr[0].Cllg_Name;
    var expconst=0;
    var expeqp =0;
    var expren =0;
    var expoth=0;
    var totalexp=0;
    var exp=0;

    for (var i in Data_Arr) 
    {
      for(var k in this.projecttypes.data)
      {
        if(this.projecttypes.data[k]._id===Data_Arr[i].Project_type)
        {
          this.projecttype = this.projecttypes.data[k].name;
        }
      } 
                                                         
      if(this.projecttype=="Construction / Creation of New Facilities")
      {
        expconst= expconst + parseInt((Data_Arr[i].Amount)||0);
      }
      else if(this.projecttype=="Renovation/Upgradation of Existing Facilities")
      {
        expren = expren+parseInt((Data_Arr[i].Amount)||0);
      }
      else if(this.projecttype=="New Equipments")     
      { 
        expeqp = expeqp + parseInt((Data_Arr[i].Amount)||0);
      } 
      else if(this.projecttype=="Others")     
      {
        expoth = expoth + parseInt((Data_Arr[i].Amount)||0);
      } 
      else
      {
        exp++;
      }

      totalexp = totalexp + parseInt((Data_Arr[i].Amount)||0);         
    }
                                                      
    this.ExpConstArr[this.innercount]= expconst;                                                                                        //   
    this.ExpEqpArr[this.innercount]= expeqp;                                                                                       //   
    this.ExpRenArr[this.innercount]= expren;    
    this.Others[this.innercount] = expoth;                                                                                    //   
    this.TotalExp[this.innercount]= totalexp;      
   
  }

}
