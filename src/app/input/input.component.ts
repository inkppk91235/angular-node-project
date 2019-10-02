import { Data } from '../model/data.model';
import {Result} from '../model/output.model';
import { DataService } from './data.service';
import { Component, OnInit, OnDestroy, DoCheck} from '@angular/core';
import {Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DataService]
})
export class InputComponent implements OnInit, OnDestroy, DoCheck {

  currency: Data[]= [];
  convertCurrency: Data[] = [];
  output: Result[] = [];
  private dataSub: Subscription;
  private outputSub: Subscription;
  firstInput = '';
  secondInput ='';
  amount: number;
  result: Result[]= [];
  convertResult:number;
  
  currencyChosen: Data[] = [];
   
  constructor(private dataservice: DataService,
      ) { }

  ngOnInit() {
      this.dataservice.getData();
      
      this.dataSub = this.dataservice.getDataUpdateListener()
        .subscribe((curr: Data[]) =>{
          this.currency = curr;
          // console.log(this.currency);
          this.convertCurrency = curr;
          this.currencyChosen = this.currency;
          // console.log(this.currencyChosen);
        });   
        
  }
 

  ngDoCheck() {
    this.convertResult = this.dataservice.convertOutput;
    console.log('test value', this.convertResult);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.outputSub.unsubscribe();
  }

  onSubmit(form: NgForm){
        
    this.dataservice.addCalculate(form.value.currency, form.value.amount, form.value.conCurrency);
         
  }

}
