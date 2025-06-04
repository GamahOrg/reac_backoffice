import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ListReformersReportResult } from '@app/modules/reports/models/Reformers-Report/reformers-report';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
declare let html2pdf: any;

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

    ///download chart as pdf 
    @ViewChild('pdfContent') pdfContent!: ElementRef;
    downloadPDF() {
      const element = this.pdfContent.nativeElement;
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.setProperty('display', 'block');
      clonedElement.style.width ='287mm';
      
      // clonedElement.style.width = '1120px';
      clonedElement.style.transform = 'scale(0.88)';
      // Convert all canvas elements to images
      const canvases = this.pdfContent.nativeElement.querySelectorAll('canvas');
      const clonedCanvases = clonedElement.querySelectorAll('canvas');
    
      canvases.forEach((canvas:any, index:any) => {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.width = canvas.style.width;
        img.style.height = canvas.style.height;
    
        const clonedCanvas = clonedCanvases[index];
        clonedCanvas.parentNode?.replaceChild(img, clonedCanvas);
      });
      const formattedDate = new Date().toISOString().split('T')[0]; // "2025-06-04"
      const fileName = `لوحة_ إحصائيات_المصلحين_${formattedDate}.pdf`;
    
      const options = {
        margin: [0,0, 0, 0],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 1,
          useCORS: true,
          allowTaint: true,
          logging: false,
          scrollY: 0 // avoid scroll offset
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'landscape'
        },
        pagebreak: {
          mode: ['css', 'legacy'],
         
        }
      };
    
      html2pdf()
        .from(clonedElement)
        .set(options)
        .save()
        .then(() => {
          clonedElement.remove(); // Clean up after download
        });
    }
}
