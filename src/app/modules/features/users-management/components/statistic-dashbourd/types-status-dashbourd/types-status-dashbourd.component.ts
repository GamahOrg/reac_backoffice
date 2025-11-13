import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatisticDashbourdService } from '../../../services/statisticDashbourdService';
import { ChartData } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashbourdRequestDto } from '../../../models/dashbourdRequestDto';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-types-status-dashbourd',
  templateUrl: './types-status-dashbourd.component.html',
  styleUrl: './types-status-dashbourd.component.scss'
})
//تفاصيل إحصائيات حالات وأنواع الدعوى
export class TypesStatusDashbourdComponent  implements OnInit {

  public reviewChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public reconciliationChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public arbitrationChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  filterForm!: FormGroup;
  LitigationStatisticsData?:any;
  constructor(private _statisticDashbourdService: StatisticDashbourdService,private fb: FormBuilder,) {}

  ngOnInit(): void {
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

  fetchLitigationStatistics(): void {
    
      const data = this.LitigationStatisticsData[0];
      console.log("data",data)
      if (data) {
        const labels = ['قيد الدراسة', 'متأخرة', 'منتهية'];

        const colors = {
          properties: '#00c9e6', 
          rent: '#b5e8fb',
          wafi: '#8ac6f2',
          brokerage: '#a19cc9',
          other: '#c29ce0'
        };
    // Review Stage Data
    this.reviewChartData = {
      labels,
      datasets: [
        { label: 'ملاك', data: [data.totalReviewNotFinishedPropertiesCount, data.totalReviewDueDatePropertiesCount, data.totalReviewFinishedPropertiesCount], backgroundColor: colors.properties },
        { label: 'إيجار', data: [data.totalReviewNotFinishedRentCount, data.totalReviewDueDateRentCount, data.totalReviewFinishedRentCount], backgroundColor: colors.rent },
        { label: 'وافي', data: [data.totalReviewNotFinishedWafiCount, data.totalReviewDueDateWafiCount, data.totalReviewFinishedWafiCount], backgroundColor: colors.wafi },
        { label: 'وساطة', data: [data.totalReviewNotFinishedRealEstateBrokerageCount, data.totalReviewDueDateRealEstateBrokerageCount, data.totalReviewFinishedRealEstateBrokerageCount], backgroundColor: colors.brokerage },
        { label: 'أخرى', data: [data.totalReviewNotFinishedOtherServicesCount, data.totalReviewDueDateOtherServicesCount, data.totalReviewFinishedOtherServicesCount], backgroundColor: colors.other }
      ]
    };

    // Reconciliation Stage Data
    this.reconciliationChartData = {
      labels,
      datasets: [
        { label: 'ملاك', data: [data.totalReconciliationNotFinishedPropertiesCount, data.totalReconciliationDueDatePropertiesCount, data.totalReconciliationFinishedPropertiesCount], backgroundColor: colors.properties },
        { label: 'إيجار', data: [data.totalReconciliationNotFinishedRentCount, data.totalReconciliationDueDateRentCount, data.totalReconciliationFinishedRentCount], backgroundColor: colors.rent },
        { label: 'وافي', data: [data.totalReconciliationNotFinishedWafiCount, data.totalReconciliationDueDateWafiCount, data.totalReconciliationFinishedWafiCount], backgroundColor: colors.wafi },
        { label: 'وساطة', data: [data.totalReconciliationNotFinishedRealEstateBrokerageCount, data.totalReconciliationDueDateRealEstateBrokerageCount, data.totalReconciliationFinishedRealEstateBrokerageCount], backgroundColor: colors.brokerage },
        { label: 'أخرى', data: [data.totalReconciliationNotFinishedOtherServicesCount, data.totalReconciliationDueDateOtherServicesCount, data.totalReconciliationFinishedOtherServicesCount], backgroundColor: colors.other }
      ]
    };

    // Arbitration Stage Data
    this.arbitrationChartData = {
      labels,
      datasets: [
        { label: 'ملاك', data: [data.totalArbitrationNotFinishedPropertiesCount, data.totalArbitrationDueDatePropertiesCount, data.totalArbitrationFinishedPropertiesCount], backgroundColor: colors.properties },
        { label: 'إيجار', data: [data.totalArbitrationNotFinishedRentCount, data.totalArbitrationDueDateRentCount, data.totalArbitrationFinishedRentCount], backgroundColor: colors.rent },
        { label: 'وافي', data: [data.totalArbitrationNotFinishedWafiCount, data.totalArbitrationDueDateWafiCount, data.totalArbitrationFinishedWafiCount], backgroundColor: colors.wafi },
        { label: 'وساطة', data: [data.totalArbitrationNotFinishedRealEstateBrokerageCount, data.totalArbitrationDueDateRealEstateBrokerageCount, data.totalArbitrationFinishedRealEstateBrokerageCount], backgroundColor: colors.brokerage },
        { label: 'أخرى', data: [data.totalArbitrationNotFinishedOtherServicesCount, data.totalArbitrationDueDateOtherServicesCount, data.totalArbitrationFinishedOtherServicesCount], backgroundColor: colors.other }
      ]
      };
  }
  }
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
    this._statisticDashbourdService.getAllLitigationByTypesStatusStatistics(Request).subscribe(
      (response) => {
         console.log(response);
       this.LitigationStatisticsData=response.data?.LitigationStatisticsForAllStages;
        // // For now, we'll just populate the data
        this.fetchLitigationStatistics();
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
