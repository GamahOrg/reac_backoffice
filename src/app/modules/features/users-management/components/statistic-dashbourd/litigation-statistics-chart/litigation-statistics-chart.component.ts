import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-litigation-statistics-chart',
  templateUrl: './litigation-statistics-chart.component.html',
  styleUrl: './litigation-statistics-chart.component.scss'
})
export class LitigationStatisticsChartComponent implements OnInit {
  @Input() chartData!: ChartData<'bar'>;
  @Input() chartTitle!: string;

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  };

  public chartType: ChartType = 'bar';

  constructor() {}

  ngOnInit(): void {}
}
