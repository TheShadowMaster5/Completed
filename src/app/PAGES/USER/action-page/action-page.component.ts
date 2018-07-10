import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FundGetterService } from '../../../SERVICE/FundGetter/fund-getter.service';

@Component({
  selector: 'app-action-page',
  templateUrl: './action-page.component.html',
  styleUrls: ['./action-page.component.css']
})
export class ActionPageComponent implements OnInit 
{
  actplan:any=[];
  college:any;
  expconst:any;
  expren:any;
  expeqp:any;
  grandtotal:any;

  constructor(
                private Router: Router,private route: ActivatedRoute, 
                private _getterService:FundGetterService, private render: Renderer2, private _zone: NgZone
             ) 
  { }

  ngOnInit() 
  {
    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
      this.Router.navigate(['/UserPage'])
  })
})
    this.getActionplan();
  }

  getActionplan()
  {
    this.expconst=0;
    this.expren=0;
    this.expeqp=0;
    var id = this.route.snapshot.params['userid'];
    this._getterService
        .getactionplan(id)
        .subscribe(ActionPlanData =>
                            {
                              this.actplan = ActionPlanData;
                              this.college = ActionPlanData[0].company;
                                      for (var _i = 0; _i < this.actplan.length; _i++) 
                                      {
                                        if(this.actplan[_i].top=="Construction")
                                        this.expconst = this.expconst +parseFloat(this.actplan[_i].exp);
                                        if(this.actplan[_i].top=="Renovation")
                                        this.expren = this.expren +parseFloat(this.actplan[_i].exp);
                                        if(this.actplan[_i].top=="Equipment")
                                        this.expeqp = this.expeqp +parseFloat(this.actplan[_i].exp);
                                      }
                                      this.grandtotal=this.expconst+this.expren+this.expeqp;
                            }
                  )
  };

}
