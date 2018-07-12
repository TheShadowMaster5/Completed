import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { FundGetterService } from '../../../../SERVICE/FundGetter/fund-getter.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-college-wise-page',
  templateUrl: './college-wise-page.component.html',
  styleUrls: ['./college-wise-page.component.css']
})
export class CollegeWisePageComponent implements OnInit {

  constructor(
    private _getterService:FundGetterService,private route: ActivatedRoute,
    private Router: Router,private render:Renderer2, private _zone:NgZone
 ) 
{ }

ngOnInit() 
{
  this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                            this.Router.navigate(['Admin']);
                                                                          }
                                                                  )
                                                    }
                    );

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
