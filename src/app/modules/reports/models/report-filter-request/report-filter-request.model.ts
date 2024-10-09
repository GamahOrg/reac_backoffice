
export class ReportFilter {

    employeeId!: String;
    litigationRequestStageId!: LitigationRequestStage;
    FromDate!: string;
    ToDate!: string;
    AreaIds!: string;
    CitiesIds!: string;
    LitigationRequestCategoryIds!: string;
    FromFees!: number;
    ToFees!: number;


}

export enum LitigationRequestStage{
    
        Add = 0,
        Review = 1,
        Reconciliation = 2,
        Arbitration = 3,
        SetReformer = 4
}

export enum LitigationRequestCategory
{
    ///<summary>صلح</summary>
    Reconciliation = 1,
    ///<summary>تحكيم</summary>
    Arbitration = 2,
    ///<summary>صلح وتحكيم</summary>
    ReconciliationAndArbitration = 3
}