import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class GetIdService {

  constructor(private http:Http) { }

  GetId(emailId)
  {
    return this.http.post("http://misrusachd.in/fundgetterapi/GetId.php",{"emailId":emailId})
                    .map(res=>res.json());
  }
}

