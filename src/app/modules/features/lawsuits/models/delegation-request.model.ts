import { LitigationRequestParty } from "../../arbitration/models/enums/arbitrator-recusal";

export interface LitigationDelegationRequest {
    id: string;
    litigationRequestCode?: string;
    delegationParty: LitigationRequestParty;
    litigationRequestOwnerTypeId: number;
    requestedOn: Date;
    isApproved?: boolean;
    isActive?: boolean;
    approvedOn?: Date;
    modifiedBy?: string;
    reason?: string;
}

export interface DelegatorsStopModify {
    id: string;
    litigationRequestId: string;
    litigationRequestCode: string;
    delegatorName: string;
    delegationParty: LitigationRequestParty;

}

export interface GetLitigationRequestWithoutDelegator{
    id: string;
    requestCode: string;
}