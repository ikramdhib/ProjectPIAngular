import { Component, OnInit } from '@angular/core';

import { lineChart, barChart, pieChart, customPieChart, gradientBarChart, gaugeChart, lineBarChart, donughnutChart, bubbleChart ,CandleStickChart} from './data';

import { ChartType } from './echart.model';

import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-echart',
  templateUrl: './echart.component.html',
  styleUrls: ['./echart.component.scss']
})

/**
 * E-chart component
 */
export class EchartComponent implements OnInit {

  constructor() { }

  lineChart: EChartsOption;
  barChart: EChartsOption;
  pieChart: EChartsOption;
  customPieChart: EChartsOption;
  gradientBarChart: EChartsOption;
  lineBarChart: EChartsOption;
  donughnutChart: EChartsOption;
  bubbleChart: EChartsOption;
  gaugeChart: EChartsOption;
  CandleStickChart:EChartsOption;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E Chart', active: true }];

    this._fetchData();
  }

  /**
   * Fetch the chart data
   */
  private _fetchData() {
    this.lineChart = lineChart;
    this.barChart = barChart;
    this.pieChart = pieChart;
    this.customPieChart = customPieChart;
    this.gradientBarChart = gradientBarChart;
    this.lineBarChart = lineBarChart;
    this.donughnutChart = donughnutChart;
    this.bubbleChart = bubbleChart;
    this.gaugeChart = gaugeChart;
    this.CandleStickChart = CandleStickChart;
  }

}
