export interface LitigationRequestExtendPeriodRequestCreateUpdateEmployeeDto {
    litigationRequestId :string;
   litigationRequestExtendPeriodRequestStatusId :LitigationRequestExtendPeriodRequestStatus;
    finishStatusReason :string;
    notes :string;
}
export enum LitigationRequestExtendPeriodRequestStatus
{
    ///<summary>موافقة</summary>
Approve = 1,
///<summary>رفض</summary>
Reject = 2,
}