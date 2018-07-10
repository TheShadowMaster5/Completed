import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FundGetterService } from '../../../../SERVICE/FundGetter/fund-getter.service';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css']
})
export class ActionPlanComponent implements OnInit {

  constructor( private router: Router,
    private route: ActivatedRoute,
    private _getterService:FundGetterService
) { }
actplan:any=[];
college:any;
  ngOnInit() 
  {
    this.getActionplan();
  }

  expconst:any;
  expren:any;
  expeqp:any;
  grandtotal:any;
  
  getActionplan()
  {
    this.expconst=0;
    this.expren=0;
    this.expeqp=0;
    var id = this.route.snapshot.params['userid'];
    this._getterService.
      getactionplan(id)
      .subscribe(employee =>
        {
          this.actplan = employee;
          this.college = employee[0].company;
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

  goBack()
  {
    this.router.navigate(['/home']);
  }


}
