import { WorkFlowStepEventShortDtos } from "./work-flow-step-event-short-dtos.model";

export interface GetWorkflowStepEventsForEmployeeDto {
    allowAssign: boolean,
    allowReAssign: null | boolean,
    workFlowStepEventShortDtos: WorkFlowStepEventShortDtos[],
    id: string
    fees: string;
}
