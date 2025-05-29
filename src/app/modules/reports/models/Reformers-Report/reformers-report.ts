export interface ListReformersReportResult{

    reformerName ?:string
    reformerStatus ?:string
    totalLitigationCount ?:string
    notFinishedCount ?:string
    finishedCount ?:string
    dueDateCount ?:string
    notFinishedRatio ?:string
    finishedRatio ?:string
    dueDateRatio ?:string
 
}

export interface FilterReformerRequestDto {
    reformerName?: string | null;  
    reformerStatus?: string | null; 
    experienceYears?: string | null; 
    isAdmin?: boolean | null;

    skip?: number;
    take?: number;
    }
    
    