import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ListReformersReportResult } from '@app/modules/reports/models/Reformers-Report/reformers-report';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-reformers-report-chart',
  templateUrl: './reformers-report-chart.component.html',
  styleUrl: './reformers-report-chart.component.scss'
})
export class ReformersReportChartComponent {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() inputData: ListReformersReportResult[] = [];
  
  chart: Chart | null = null;
  selectedChartType: ChartType = 'bar';
  selectedDataView: string = 'litigation';
  
  get data(): ListReformersReportResult[] {
    return this.inputData;
  }
  
  ngOnInit() {
    if (this.inputData.length > 0) {
      this.createChart();
      this.updateChart();
    }
   
  }
  
  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
    if (this.inputData.length === 0) {
      this.chart?.destroy();
      this.chart = null;
    }else{
      this.updateChart();
    }
  }
  
  createChart() {
    if (this.inputData.length === 0) return;
  
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
  
    const chartConfig = this.getChartConfiguration();
    
    if (this.chart) {
      this.chart.destroy();
    }
    
    this.chart = new Chart(ctx, chartConfig);
  }
  
  updateChart() {
    this.createChart();
    
  }
  
  getChartConfiguration(): ChartConfiguration {
    const datasets = this.getDatasets();
    const labels = this.getLabels();
  
    return {
      type: this.selectedChartType,
      data: {
        labels: labels,
        datasets: datasets?? []
         
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: this.getChartTitle(),
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: this.getScales()
      }
    };
  }
  
  getDatasets() {
    switch (this.selectedDataView) {
      case 'litigation':
        return [
          {
            label: 'الحاليه',
            data: this.data.map(item => typeof item.notFinishedCount === 'string' ? parseFloat(item.notFinishedCount) : item.notFinishedCount ?? null),
            backgroundColor: '#ff6b6b',
            borderColor: '#ff5252',
            borderWidth: 1
          },
          {
            label: 'مكتملة',
            data: this.data.map(item => typeof item.finishedCount === 'string' ? parseFloat(item.finishedCount) : item.finishedCount ?? null),
            backgroundColor: '#4ecdc4',
            borderColor: '#26a69a',
            borderWidth: 1
          },
          {
            label: ' المتاخره',
            data: this.data.map(item => typeof item.dueDateCount === 'string' ? parseFloat(item.dueDateCount) : item.dueDateCount ?? null),
            backgroundColor: '#45b7d1',
            borderColor: '#2196f3',
            borderWidth: 1
          }
        ];
      
      case 'ratios':
        return [
          {
            label: 'نسبه الحاليه %',
            data: this.data.map(item => typeof item.notFinishedRatio === 'string' ? parseFloat(item.notFinishedRatio) : item.notFinishedRatio ?? null),
            backgroundColor: '#ff6b6b',
            borderColor: '#ff5252',
            borderWidth: 1
          },
          {
            label: 'نسبة المكتملة %',
            data: this.data.map(item => typeof item.finishedRatio === 'string' ? parseFloat(item.finishedRatio) : item.finishedRatio ?? null),
            backgroundColor: '#4ecdc4',
            borderColor: '#26a69a',
            borderWidth: 1
          },
          {
            label: 'نسبة  المتاخره %',
            data: this.data.map(item => typeof item.dueDateRatio === 'string' ? parseFloat(item.dueDateRatio) : item.dueDateRatio ?? null),
            backgroundColor: '#45b7d1',
            borderColor: '#2196f3',
            borderWidth: 1
          }
        ];
      
      default:
        return [];
    }
  }
  
  getLabels(): string[] {
    return this.data.map(item => (item.reformerName ?? 'غير محدد') as string);
  }
  
  getChartTitle(): string {
    switch (this.selectedDataView) {
      case 'litigation':
        return 'الدعاوى  حسب الحالة';
      case 'ratios':
        return 'نسب الإنجاز حسب المصلح';
      default:
        return 'إحصائيات الدعاوى ';
    }
  }
  
  getScales(): any {
    if (this.selectedChartType === 'pie' || this.selectedChartType === 'doughnut') {
      return {};
    }
  
    return {
      x: {
        display: true,
        title: {
          display: true,
          text: 'المصلحون'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: this.selectedDataView === 'ratios' ? 'النسبة المئوية (%)' : 'العدد'
        },
        beginAtZero: true
      }
    };
  }
  
  // Helper methods for summary
  getTotalCases(): number {
    return this.data.reduce((sum, item) => sum + (typeof item.totalLitigationCount === 'number' ? item.totalLitigationCount : 0), 0);
  }
  
  getAverageCompletionRate(): string {
    const avgFinished = this.data.reduce((sum, item) => sum + (typeof item.finishedRatio === 'number' ? item.finishedRatio : 0), 0) / this.data.length;
    return avgFinished.toFixed(1);
  }
}
