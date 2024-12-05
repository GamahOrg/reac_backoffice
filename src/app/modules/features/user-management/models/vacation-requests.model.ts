export interface SysVacationRequestCreateUpdateDto {
id: string;
 employeeId : string;
 employeeName : string ;
 startDate : Date;
 endDate : Date;
 reason : string;
 isApproved  : boolean;
 approvedBy  :string;
 approvedOn : Date;
}