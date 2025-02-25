export interface EmployeeReviewer  {
    id: string;
    fullName: string;
    requestsCount: number;
    employeeName:string;
}

export interface AssignEmployeePayload {
    requestId: string;
    employeeId: string;
}

export interface LitigationRequestMircoForRequestReviewerDto{
    id: string;
    requestCode: string | null;
    requestDate: string;
    firstPartyName: string;
    secondPartyName: string;
    requestTypeName: string;
    employeeName: string | null;
    employeeId: string;
}