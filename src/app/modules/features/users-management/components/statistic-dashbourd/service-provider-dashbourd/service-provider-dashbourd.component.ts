import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { StatisticDashbourdService } from '../../../services/statisticDashbourdService';
declare let html2pdf: any;
@Component({
  selector: 'app-service-provider-dashbourd',
  templateUrl: './service-provider-dashbourd.component.html',
  styleUrl: './service-provider-dashbourd.component.scss'
})
export class ServiceProviderDashbourdComponent implements OnInit{
  public ProviderChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  StatisticsData?:any;
  constructor(private _statisticDashbourdService: StatisticDashbourdService) {}


  ngOnInit(): void {
    this.GetReviewrsReformersArbitratorsStatisticsReport();
  } 

  fetchStatistics(): void {
    
    const data = this.StatisticsData[0];
    console.log("data",data)
    if (data) {
      const labels = [ 'المدققين', 'المصلحين', 'المحكمين'];

      const colors = {
        properties: '#00c9e6', 
        rent: '#b5e8fb',
        wafi: '#8ac6f2',
        brokerage: '#a19cc9',
        other: '#ff9292'
      };
  // Review Stage Data
  this.ProviderChartData = {
    labels,
    datasets: [
      { label: 'المعتمدين', data: [data.certifiedReviewers, data.certifiedReformers,data.certifiedArbitrators], backgroundColor: colors.properties },
      { label: 'الموقوفين', data: [data.stoppedReviewers, data.stoppedReformers,data.stoppedArbitrators], backgroundColor: colors.other },
    ]
  };




}
}

GetReviewrsReformersArbitratorsStatisticsReport() {
 
    this._statisticDashbourdService.GetReviewrsReformersArbitratorsStatisticsReport().subscribe(
      (response) => {
         console.log(response);
       this.StatisticsData=response.data;
        // // For now, we'll just populate the data
        this.fetchStatistics();
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
        clonedElement.style.width ='290mm';
        
        // clonedElement.style.width = '1120px';
        clonedElement.style.transform = 'scale(0.69)';
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
        const fileName = `لوحة_ إحصائيات_مقدمين_الخدمة ${formattedDate}.pdf`;
      
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
