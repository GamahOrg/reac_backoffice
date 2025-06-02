export interface ReviewReformerArbitratorFilterDto {
     personnelTypeId : string[] | null;
     employeeIds : string[] | null;
     reformersIds : string[] | null;
     arbitratorsIds : string[] | null;
     arbitratorClassIds : string[] | null;
     personnelStatusId : string[] | null;
    
     experienceYears : number | null;
     skip : number | null;
     take : number | null;
}

export interface ReviewReformerArbitratorDto {
    personnelName : string | null;
    personnelType : string | null;
    personnelStatus : string | null;
    personnelTypeId : number | null;
    experienceYears : number | null;

    totalLitigationCount : number | null;
    notFinishedCount : number | null;
    finishedCount : number | null;
    dueDateCount : number | null;

    chairmanTotalCount : number | null;
    chairmanNotFinishedCount : number | null;
    chairmanFinishedCount : number | null;
    chairmanDueDateCount : number | null;

    arbitratorTotalCount : number | null;
    arbitratorNotFinishedCount : number | null;
    arbitratorFinishedCount : number | null;
    arbitratorDueDateCount : number | null;

    notFinishedRatio : number | null;
    finishedRatio : number | null;
    dueDateRatio : number | null;
}