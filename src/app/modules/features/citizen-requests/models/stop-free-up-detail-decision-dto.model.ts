import { StoppingReason } from "./enums/stopping-reason.model"

export interface StopFreeUpDetailDecisionDto {
    reformerStatus?: string
    arbitratorStatus?: string
    decisionDate: Date
    stoppedFromDate?: Date
    stoppedToDate?: Date
    stoppingReason: StoppingReason
    lateLitigationRequestNumber?: string
}
