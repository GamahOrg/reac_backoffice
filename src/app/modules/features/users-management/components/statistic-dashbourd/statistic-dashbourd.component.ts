import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartOptions, ChartData, ChartDataset } from 'chart.js';
import { ChartType } from 'chart.js';
import { StatisticDashbourdService } from '../../services/statisticDashbourdService';
import { DashbourdRequestDto } from '../../models/dashbourdRequestDto';
declare let html2pdf: any;
@Component({
  selector: 'app-statistic-dashbourd',
  templateUrl: './statistic-dashbourd.component.html',
  styleUrl: './statistic-dashbourd.component.scss'
})
export class StatisticDashbourdComponent implements OnInit {

  public labels: any[] = ['مرحلة التدقيق', 'مرحلة الصلح', 'مرحلة التحكيم'];
  LitigationStatisticsData?:any;

  filterForm: FormGroup;

  // Chart configuration options
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  public chartType: ChartType = 'bar'; 
  public chartLegend = true; 

  constructor(private fb: FormBuilder,private _statisticDashbourdService : StatisticDashbourdService) {
    const today = new Date();
  
    // Calculate the date 7 days before today
    const sevenDaysBefore = new Date();
    sevenDaysBefore.setDate(today.getDate() - 29);
    today.setDate(today.getDate() +1);
    const todayFormatted = today.toISOString().split('T')[0];
    const sevenDaysBeforeFormatted = sevenDaysBefore.toISOString().split('T')[0];

    this.filterForm = this.fb.group({
      startDate: [sevenDaysBeforeFormatted],
      endDate: [todayFormatted]
    });
    this.filterDataByDateRange(sevenDaysBeforeFormatted,todayFormatted);
  }

  ngOnInit(): void {
   
  }

  public totalChartData: ChartData<'bar'> = {
    labels: ['مرحلة التدقيق', 'مرحلة الصلح', 'مرحلة التحكيم'],
    datasets: []
  };
  public typeChartData: ChartData<'bar'> = {
    labels: ['مرحلة التدقيق', 'مرحلة الصلح', 'مرحلة التحكيم'],
    datasets: []
  };
  public statusChartData: ChartData<'bar'> = {
    labels: ['تم الصلح في منصة تراضي','تنازل المدعي عن الدعوي', 'تنازل المدعي عن الحق','عدم الصلح', 'تم الصلح'],
    datasets: []
  };
  getLitigationStatisticsByType(item:any): void {
  // New Chart Data for the Second Chart
this.typeChartData = {
  labels: ['مرحلة التدقيق', 'مرحلة الصلح', 'مرحلة التحكيم'],
  datasets: [
    {
      label: 'ملاك',
      data: [item[0].totalReviewPropertiesCount, item[0].totalReconciliationPropertiesCount, item[0].totalArbitrationPropertiesCount],
      backgroundColor: '#00c9e6'
    },
    {
      label: 'إيجار',
      data: [item[0].totalReviewRentCount, item[0].totalReconciliationRentCount, item[0].totalArbitrationRentCount],
      backgroundColor: '#b5e8fb'
    },
    {
      label: 'وافي',
      data: [item[0].totalReviewWafiCount, item[0].totalReconciliationWafiCount, item[0].totalArbitrationWafiCount],
      backgroundColor: '#8ac6f2'
    },
    {
      label: 'وساطة',
      data: [item[0].totalReviewRealEstateBrokerageCount, item[0].totalReconciliationRealEstateBrokerageCount, item[0].totalArbitrationRealEstateBrokerageCount],
      backgroundColor: '#a19cc9'
    },
    {
      label: 'أخرى',
      data: [item[0].totalReviewOtherServicesCount, item[0].totalReconciliationOtherServicesCount, item[0].totalArbitrationOtherServicesCount],
      backgroundColor: '#c29ce0'
    }
  ]
};
this.statusChartData = {
  labels: ['تم الصلح في منصة تراضي','تنازل المدعي عن الدعوي', 'تنازل المدعي عن الحق','عدم الصلح', 'تم الصلح'],
  datasets: [
    {
      label: 'منتهية',
      data: [item[0].theReconciliationOnTradyPatformCount,item[0].waiverOfTheLawSuitCount , item[0].waiverOfRightCount,item[0].lackOfReconciliationCount ,item[0].reconciliationWasMadeCount ],
      backgroundColor: '#00c9e6'
    }
  ]
};
  }
  // Mock function to load data (replace with actual API call)
  getLitigationStatisticsByStatus(item:any): void {
    console.log("item",item)
    this.totalChartData = {
      labels: ['مرحلة التدقيق', 'مرحلة الصلح', 'مرحلة التحكيم'],
      datasets: [
        {
          label: 'عدد الدعاوى الكلية',
          data: [item[0].totalReviewAllCount, item[0].totalReconciliationAllCount, item[0].totalArbitrationAllCount],
          backgroundColor: '#00c9e6'
        },
        {
          label: 'عدد الدعاوى قيد الدراسة',
          data: [item[0].totalReviewNotFinishedCount, item[0].totalReconciliationNotFinishedCount, item[0].totalArbitrationNotFinishedCount],
          backgroundColor: '#b5e8fb'
        },
        {
          label: 'عدد الدعاوى المتأخرة',
          data: [item[0].totalReviewDueDateCount, item[0].totalReconciliationDueDateCount,  item[0].totalArbitrationDueDateCount],
          backgroundColor: '#8ac6f2'
        },
        {
          label: 'عدد الدعاوى المنتهية',
          data: [item[0].totalReviewFinishedCount, item[0].totalReconciliationFinishedCount,  item[0].totalArbitrationFinishedCount],
          backgroundColor: '#a19cc9'
        }
      ]
    };
  }

  // Apply the filter based on the date range
  applyFilter() {
    const { startDate, endDate } = this.filterForm.value;
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate && endDate && start > end) {
      alert('تاريخ البداية يجب أن يكون قبل تاريخ النهاية');
      return;
    }

    // Call filtering function based on the selected dates
    this.filterDataByDateRange(start.toLocaleDateString('en-CA'), end.toLocaleDateString('en-CA'));
  }

  filterDataByDateRange(startDate?: string, endDate?: string) {
    console.log('Filtering data from:', startDate, 'to:', endDate);
    var Request :DashbourdRequestDto={
      fromDate :startDate,
      toDate:endDate
    }
    this._statisticDashbourdService.getAllStatistics(Request).subscribe(
      (response) => {
         console.log(response);
       this.LitigationStatisticsData=response.data?.LitigationStatisticsForAllStages;
        // For now, we'll just populate the data
         this.getLitigationStatisticsByStatus(this.LitigationStatisticsData);
         this.getLitigationStatisticsByType(this.LitigationStatisticsData);
      },
      (error: any) => {
        console.error('Error updating item:', error);
       
      }
    );
   
  }

    ///download chart as pdf 
      @ViewChild('pdfContent') pdfContent!: ElementRef;
      downloadPDF() {
        const element = this.pdfContent.nativeElement;
        const clonedElement = element.cloneNode(true) as HTMLElement;
        clonedElement.style.setProperty('display', 'block');
        clonedElement.style.width ='220mm';
        
        // clonedElement.style.width = '1120px';
        clonedElement.style.transform = 'scale(0.74)';
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
        const fileName = `لوحة_ إحصائيات_تفاصيل_حالات_وأنواع_الدعوى${formattedDate}.pdf`;
      
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

