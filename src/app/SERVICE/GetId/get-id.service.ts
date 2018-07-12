import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class GetIdService {

  constructor(private http:Http) { }

  GetCompany()
  {
    return this.http.get("http://misrusachd.in/fundgetterapi/selectnewlinks.php")
                    .map(res=>{
                                 return  res.json();
                              }
                        );
  }
}

