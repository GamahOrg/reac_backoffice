import { LitigationRequestShortDto } from "./litigation-request-for-extend-period-request-dto";

export interface LitigationRequestForArbitratorSelectionDurationDto {
    allowAdd: boolean;
    arbitratorSelectionDuration: number
    litigationRequestShortDto: LitigationRequestShortDto;
}


export interface LitigationRequestForAllArbitratorNominationListDto {
    allowAdd: boolean;
    listCount: number | null;
    citizenArbitratorShortStatusDtos: CitizenArbitratorShortStatusDto[];
    litigationRequestShortDto: LitigationRequestShortDto | null;
}

export interface LitigationRequestForAllArbitratorNominationCharmanListDto {
    allowAdd: boolean;
    allowDecision: boolean
    listCount: number | null;
    citizenArbitratorCharmanShortStatusDtos: CitizenArbitratorShortStatusDto[];
    litigationRequestShortDto: LitigationRequestShortDto | null;
}

export interface CitizenArbitratorShortStatusDto {
    id: string;
    plaintiffPriority: string;
    defendantPriority: string;
    identityNumber: string;
    fullName: string;
    mobile: string;
    email: string | null;
    experienceYears: number | null;
    arbitratorClass: string | null;
    requestsCount: number | null;
    brief: string | null;
    arbitratorStatus: string | null;
    arbitratorStatusDate: string | null;
    status: string;
    totalPriority: number
}

export interface ArbitratorNominationListRequestPayload {
    requestId: string;
    arbitrators: string[];
}