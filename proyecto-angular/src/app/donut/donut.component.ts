import { Component, OnInit } from '@angular/core';
import { createDonutChart} from '../../libs/donut.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {

  constructor() { }

  donutData : any  = {
    container: 'donut',
    type: "donut",
    title: "Balance for all your medical bills",
    cssClass: "donut",
    base: 4795.19,
    legend: {
      title: '4795.19',
      desc: 'total balance'
    },
    data: [{
      name:  "Total balance on payment plans",
      x: 1500,
      color: "#A67AF8"
    },
    {
      name: "Remaining balance due",
      x: 3215.97,
      color: "#20A29E"
    }
  ]
  }

  ngOnInit(): void {
    console.log("init")
  }

  ngAfterContentInit(): void {

    let data = this.donutData;

    createDonutChart(data);

    console.log("afterViewContentInit");
    document.onreadystatechange = function () {
      if( document.readyState === 'complete' ){

      }
    };


  }

}