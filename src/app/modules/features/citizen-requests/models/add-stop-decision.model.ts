import { StoppingReason } from "./enums/stopping-reason.model";

export interface AddStopDecision {
    citizenId: string,
    decisionDate: Date,
    stoppingReason: StoppingReason,
    lateLitigationRequestNumber: string|null
}
