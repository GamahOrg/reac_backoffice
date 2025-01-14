import { ArbitratorAssigningRequestType } from "./litigation-request-mirco-arbitrator-dto";

export interface AssignArbitratorRequestPayload {
    requestId:string;
    litigationRequestArbitratorListId:string;
    arbitratorAssigningRequestTypeId:ArbitratorAssigningRequestType;
    arbitratorId:string;
}
