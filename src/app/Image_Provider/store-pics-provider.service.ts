import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorePicsProviderService 
{
  Pics_arr:any[] = new Array();
  constructor() { }

  Store_Pics_Camera(Images_Url)
  {
      this.Pics_arr.push(Images_Url);
  }

  Get_Pics()
  {
    if(this.Pics_arr.length>0)
    {
      return this.Pics_arr;
    }
    else
    {
      var mess = "No Image";
      return mess;
    }
  }

  Clear_All()
  {
      var length = this.Pics_arr.length;
      for(var i=0;i<length;i++)
      {
        this.Pics_arr.pop();
      }
  }

  Delete(index)
  {
    this.Pics_arr.splice(index,1);
  }
}



