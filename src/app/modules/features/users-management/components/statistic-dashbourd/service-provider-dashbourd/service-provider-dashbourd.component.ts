import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { StatisticDashbourdService } from '../../../services/statisticDashbourdService';

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

}
