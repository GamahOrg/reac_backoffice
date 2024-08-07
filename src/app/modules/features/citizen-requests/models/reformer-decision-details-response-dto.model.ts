import { ReformerArbitratorStatus } from "./enums/reformer-arbitrator-status.model"
import { StopFreeUpDetailDecisionDto } from "./stop-free-up-detail-decision-dto.model"

export interface ReformerDecisionDetailsResponseDto {
    identityNumber: string,

    fullName: string,
    mobile: string,
    homeTelephone: string | null,
   
    workTelephone: string | null,
    fax: string | null,
    email: string,
    academicDegreeName: string | null,
    isVolunteerApproval: string | null,
    
    requestsCount: number,
    reformerStatusId: ReformerArbitratorStatus,
    reformerStatus: string | null,
    reformerStatusDate: Date | null,
    reformerStopFreeUpDetailDecisionDtos: StopFreeUpDetailDecisionDto[],
    id: string
}


