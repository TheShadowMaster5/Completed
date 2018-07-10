import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable
({
  providedIn: 'root'
})

export class FtinfoService 
{

  constructor(private http:Http) { }

  results:any;
  Amount:any[] = new Array();
  stop:any;

  // public getlink():any
  // { 
  //   return(this.http.get("http://misrusachd.in/usersc/fundtrackersummary/fundlink.php"))
  //             .map(res=>res.json());
  // }

  public Retrieve_All_Transaction_Data(Fundtracker_Rusa_Cllg_Id:any,index)
  {  
    console.log("inside retrievedata");
    var body = {"_id":Fundtracker_Rusa_Cllg_Id}; 
    
    return(this.http.post("https://rusamhrd.tiss.edu/api/transaction/specTransOfComp",{"transactionType": "All", "compId":Fundtracker_Rusa_Cllg_Id})
    .map(Page1_Data=>{
                var All_Transactions_Data = Page1_Data.json();
                // console.log("retreive data");
                All_Transactions_Data.data.index = index;   // Inserting the count in the json for the sync
                var page_number =1 ;
                var status= 0;

                do
                {
                  page_number++;
                  this.Retrieve_Leftover_Page_Data(Fundtracker_Rusa_Cllg_Id,page_number)
                      .subscribe(Page2_Data=>
                                        {
                                          if(Page2_Data.length>0)
                                          {
                                            for(var i=0;i<Page2_Data.length;i++)
                                            {
                                              All_Transactions_Data.data.results.push(Page2_Data[i]);
                                            }
                                          }
                                          status = 1;
                                          console.log("Inside subscribe"+ status);
                                        });
                                       
                }
                while(page_number<2);
                var counting =0;

                while(status==0)
                {
                  counting++;
                  console.log("Waiting");
                  if(counting===100)
                  {
                    break;
                  }
                }
                return All_Transactions_Data;

                
               
              }));   
  }

  public Retrieve_Leftover_Page_Data(Fundtracker_Rusa_Cllg_Id:any,page_number:any)
  {
    return(this.http.post("https://rusamhrd.tiss.edu/api/transaction/specTransOfComp",{"transactionType": "All", "compId":Fundtracker_Rusa_Cllg_Id ,"page": page_number, "numberOfRecords": 50})
    .map(res1=>{
                  var Results:any[];
                  if(res1.json().data.results.length!=0)
                  {
                    Results = res1.json().data.results;
                  }
                  else
                  {
                    Results = [];
                  }
                  return Results;
              }
        ));
  }


  public Merging_Two_API(All_Transactions_Data,Fundtracker_Rusa_Cllg_Id)
  {
    return(this.http
              .post("https://rusamhrd.tiss.edu/api/Components/getOne",{"_id":Fundtracker_Rusa_Cllg_Id}))
              .map(Cllg_All_Data_With_Pro_Exp_Id =>
                          {
                            var info = Cllg_All_Data_With_Pro_Exp_Id.json();
                            var Trans_Result_Length = All_Transactions_Data.data.results.length;
                            var Total_Project_Length = info.data.project.length;  
                            var Data_Arr:any[] = new Array();
                            var index = 0; 

                            for( let i=0;i<Total_Project_Length;i++)
                            {
                              var Proj_Exp_Len = info.data.project[i].projectExpense.length;
                              
                              for(let j=0;j<Proj_Exp_Len;j++)
                              {
                                for(let k=0;k<Trans_Result_Length;k++)
                                {
                                    var Proj_Expense_Id = info.data.project[i].projectExpense[j];
                                    var All_Trans_Exp_Id = All_Transactions_Data.data.results[k].projectExpense;
                                    
                                    if(Proj_Expense_Id == All_Trans_Exp_Id)
                                    {
                                      var Amount = All_Transactions_Data.data.results[k].amount;
                                      var Project_type = info.data.project[i].projectType; 
                                      var Cllg_Name = info.data.institute.name;
                                      var Project_Id = info.data.project[i]._id;
                                      var Asset_Type = info.data.project[i].assetType;
                                      var Project_Value = info.data.project[i].valueOfProject;
                                      var Exp_Till_Now = info.data.project[i].valueOfProject;
                                      var Exp_Finish_Date= info.data.project[i].dueDate;
                                      
                                      Data_Arr.push({Amount,Project_type,Cllg_Name,Project_Id,Asset_Type,Project_Value,Exp_Till_Now,Exp_Finish_Date});
                                      
                                    }
                                }
                              }

                            }
                                
                            return Data_Arr;
                          }
                          
                    );
  }

}