export interface ListArbitratorsReportResult{

    arbitratorName ?:string
    arbitratorStatus ?:string
    totalLitigationCount ?:string
    notFinishedCount ?:string
    finishedCount ?:string
    dueDateCount ?:string
    notFinishedRatio ?:string
    finishedRatio ?:string
    dueDateRatio ?:string
 
}



export interface FilterArbitratorRequestDto {
    arbitratorName?: string | null;  
    arbitratorStatus?: string | null; 
    experienceYears?: string | null; 
    isAdmin?: boolean | null;
    skip?: number;
    take?: number;
    }