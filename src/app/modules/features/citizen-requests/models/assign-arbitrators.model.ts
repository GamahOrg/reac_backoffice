import { LitigationRequestShortDto } from "../../arbitration/models/arbitration-request.model";

export interface LitigationRequestForAllArbitratorNominationListWithPartiesValueDto {
    allowAdd: boolean;
    citizenArbitratorShortStatusDtos: CitizenArbitratorShortStatusWithValueDto[];
    citizenSelectedArbitratorShortStatusDtos: CitizenArbitratorShortStatusWithValueDto[];
    citizenSelectedUserArbitratorShortStatusDtos: CitizenArbitratorShortStatusWithValueDto[];
    citizenRejectedArbitratorShortStatusDtos: CitizenArbitratorShortStatusWithValueDto[];
    litigationRequestShortDto: LitigationRequestShortDto | null;
    
}

export interface CitizenArbitratorShortStatusWithValueDto {
    id: string;
    citizenId: string;
    fullName: string;
    brief: string | null;
    value: number | null;
    isSelected: boolean;
    mobile: string | null;
    email: string | null;   
    arbitratorClass: string | null;
    experienceYears: number | null;
    identityNumber: string | null;
    isPlaintiffSelected: boolean;
    isDefendantSelected: boolean;
    isArbitratorAdminSelected: boolean;
    isSent: boolean;
}

export interface ArbitratorNominationListRequestReplyPayload {
    requestId: string;
    arbitratorNominationListRequestItems: ArbitratorNominationListRequestItem[];
}

export interface ArbitratorNominationListRequestItem {
    arbitratorListId: string;
    priority: number;
}