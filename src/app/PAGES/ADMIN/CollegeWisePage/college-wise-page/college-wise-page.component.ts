import { Component, OnInit } from '@angular/core';
import { FundGetterService } from '../../../../SERVICE/FundGetter/fund-getter.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-college-wise-page',
  templateUrl: './college-wise-page.component.html',
  styleUrls: ['./college-wise-page.component.css']
})
export class CollegeWisePageComponent implements OnInit {

  constructor(
    private _getterService:FundGetterService,
    private route: ActivatedRoute,private router: Router
 ) 
{ }

ngOnInit() 
{
this.getfundgetters(); 
}

getters:any;

getfundgetters()
{
this._getterService
.getfundgettingcolleges()
.subscribe(employ => 
        {
          this.getters = employ;
          console.log("Employee")
          console.log(employ);
          console.log("*******");
        } 
      )
}     

}
