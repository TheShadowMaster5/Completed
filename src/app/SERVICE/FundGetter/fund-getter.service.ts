import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable
({
  providedIn: 'root'
})

export class FundGetterService 
{
  constructor(private _http:Http) { }
  checkme:any;

  getfundgettingcolleges() 
  {
    return this._http.get("http://misrusachd.in/fundgetterapi/selectnewlinks.php")
        .map(
              Cllg=>{
                      this.checkme = Cllg;
        
                      if(this.checkme._body !== "0")
                      {
                          return Cllg.json()
                      }
                    }
            );
  }
  
  getactionplan(userid)
  {
    console.log(userid);
    return this._http.post("http://misrusachd.in/fundgetterapi/selectone.php/",{'userid':userid})
        .map(res=>res.json());
  }

}
