import { Component, ElementRef, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { ChartType } from './chartist.model';

import {
  // tslint:disable-next-line: max-line-length
  simpleLineChart, lineScatter, areaLineChart, overlappingBarChart, stackBarChart, horizontalBarChart,
  donutAnimateChart, simplePieChart
} from './data';

@Component({
  selector: 'app-chartist',
  templateUrl: './chartist.component.html',
  styleUrls: ['./chartist.component.scss']
})

/**
 * Chartist-chart component
 */
export class ChartistComponent implements OnInit {


  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Simple line chart
  simpleLineChart: ChartType;
  // Line Scatter Diagram
  lineScatter: ChartType;
  // Line chart with area
  areaLineChart: ChartType;
  // Overlapping bars on mobile
  overlappingBarChart: ChartType;
  // Stacked bar chart
  stackBarChart: ChartType;
  // Horizontal bar chart
  horizontalBarChart: ChartType;
  // Animating a Donut with Svg.animate
  donutAnimateChart: ChartType;
  // simple pie chart
  simplePieChart: ChartType;

  constructor(private elementRef: ElementRef) { }
  
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Chartist chart', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the chart data
   */
  private _fetchData() {

    // Simple line chart data
    this.simpleLineChart = simpleLineChart;
    // Line Scatter Diagram data
    this.lineScatter = lineScatter;
    // Line chart with area chart data
    this.areaLineChart = areaLineChart;
    // Overlapping bars on mobile
    this.overlappingBarChart = overlappingBarChart;
    // Stacked bar chart data
    this.stackBarChart = stackBarChart;
    // Horizontal bar chart
    this.horizontalBarChart = horizontalBarChart;
    // Animating a Donut chart data
    this.donutAnimateChart = donutAnimateChart;
    // simple pie chart data
    this.simplePieChart = simplePieChart;

    var times = function(n) {
      return Array.apply(null, new Array(n));
    };
    
    var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
      data.labels.push(index + 1);
      data.series.forEach(function(series) {
        series.push(Math.random() * 100)
      });
    
      return data;
    }, {
      labels: [],
      series: times(4).map(function() { return new Array() })
    });
    
    var options = {
      height: 300,
      showLine: false,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 13 === 0 ? 'W' + value : null;
        }
      }
    };
    
    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 4 === 0 ? 'W' + value : null;
          }
        }
      }]
    ];
    
    // new Chartist.Line(this.elementRef.nativeElement.querySelector('.ct-chart'), data, options, responsiveOptions);
    new Chartist.LineChart(this.elementRef.nativeElement.querySelector('.ct-chart-scatter'), data, options);
  }

  
}
