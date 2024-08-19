import { ReformerArbitratorStatus } from "./enums/reformer-arbitrator-status.model";
import { StopFreeUpDetailDecisionDto } from "./stop-free-up-detail-decision-dto.model";

export interface ArbitratorDecisionDetailsResponseDto {
    identityNumber: string;
    fullName: string;
    mobile: string;
    homeTelephone: string | null;
    workTelephone: string | null;
    fax: string | null;
    email: string;
    academicDegreeName: string | null;
    isVolunteerApproval: string | null;
    requestsCount: number;
    areaName: null,
    arbitratorStatus: string | null,
    arbitratorStatusDate: Date | null,
    
    experienceYears: null,
    arbitratorClass: null,
    brief: null,
    arbitratorStopFreeUpDetailDecisionDtos: StopFreeUpDetailDecisionDto[],
    arbitratorStatusId: ReformerArbitratorStatus,
    id: string
}
