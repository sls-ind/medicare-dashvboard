import {Component, OnInit, Input} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
})
export class DynamicChartComponent implements OnInit {
  @Input() chartOptionsDetails: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
  };
  public barChartLabels = [];
  public barChartType = '';
  public barChartLegend = true;
  public barChartData = [];
  // public barChartLabels: Label[] = ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;

  // public barChartData: ChartDataSets[] = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'SIS'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'DIA'}
  // ];

  constructor() {
    console.log("chartOptionsDetails", this.chartOptionsDetails)
  }

  ngOnInit() {
    console.log("chartOptionsDetails", this.chartOptionsDetails)
    if(this.chartOptionsDetails){
      this.renderChartOptionsDetails();
    }
  }

  renderChartOptionsDetails(){
    this.barChartLabels = this.chartOptionsDetails['barChartLabels'];
    this.barChartType = this.chartOptionsDetails['barChartType'];
    this.barChartLegend = this.chartOptionsDetails['barChartLegend'];
    this.barChartData = this.chartOptionsDetails['barChartData'];
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
