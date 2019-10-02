
import { Input } from '../model/input.model';
import { Data } from '../model/data.model';

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: "root"})
export class DataService {
    private data: Data[] = [];   
    private dataUpdated = new Subject<Data[]>();
    private input: Input[] = [];
    convertOutput:number = 0;
    
    constructor(private http: HttpClient) {   
    }

    getData() {
        this.http.get<{messsage: string, data: Data[]}>('http://localhost:3000/api/posts')
        .subscribe((postData) => {
            this.data = postData.data;
            this.dataUpdated.next([...this.data]);
            
        });
    }
    
    getDataUpdateListener() {
        return this.dataUpdated.asObservable();
    }

    addCalculate(curr: string, amount: number, conCurr: string) {
        const inputs: Input = {currency: curr, amount: amount, conCurrency: conCurr};
        var num:number;
        this.http.post<{messsage: string, result: string}>("http://localhost:3000/api/posts", inputs)
            .subscribe((resData)=>{
                 
                this.input.push(inputs);
                num = parseFloat(resData.result);
                
                this.convertOutput = num;
                // return this.convertOutput;
            });
            
    }

    



}