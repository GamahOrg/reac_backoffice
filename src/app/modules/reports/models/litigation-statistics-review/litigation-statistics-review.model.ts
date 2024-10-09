export interface GetLitigationStatisticsMainReportResult{

     totalLitigationCount : number;
     notFinishedCount : number;
     finishedCount : number;
     realEstateBrokerageCount : number;
     wafiCount : number;
     otherServicesCount : number;
     rentCount : number;
     propertiesCount : number;

     notFinishedRatio : number;
     finishedRatio : number;
     realEstateBrokerageRatio : number;
     wafiRatio : number;
     otherServicesRatio : number;
     rentRatio : number;
     propertiesRatio : number;
}

