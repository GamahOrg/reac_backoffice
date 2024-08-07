import { StoppingReason } from "./enums/stopping-reason.model"

export interface StopFreeUpDetailDecisionDto {
    reformerStatus?: string
    arbitratorStatus?: string
    decisionDate: Date
    stoppingReason: StoppingReason
    lateLitigationRequestNumber?: string
}
