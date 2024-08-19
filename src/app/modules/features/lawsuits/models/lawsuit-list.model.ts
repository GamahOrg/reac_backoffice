import { LawsuitStatus } from "./enums/lawsuit-status.model";

export interface AuditngList {
    items: AuditngListItem[],
    pageIndex: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}

export interface AuditngListItem {
    id: string,
    requestCode: string,
    createdOn: Date,
    assignedOn: Date,
    firstPartyName: string,
    secondPartyName: string,
    auditngRemaningDays: number,
    internalStatusId: number,
    litigationRequestContractTypeId: number,
    externalStatusId: number,
}

export interface LawsuitDetails {
    lawsuitID: string;
    lawsuitNumber: string;
    submissionDate: string;
    lawsuitType: string;
    plaintiffName: string;
    defendantName: string;
    appointmentDate: string;
    lawsuitStatus: LawsuitStatus;
    remainingAuditDays: number;
}