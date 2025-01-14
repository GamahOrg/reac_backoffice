import { LitigationRequestReformerAssigningRequestStatus } from "./enums/litigation-request-reformer-assigning-request-status";

export interface LitigationRequestMircoDtoReformer {
    id:string;
     requestCode:string;
    requestDate:Date;
    firstPartyName :string;
    secondPartyName :string;
    requestTypeName:string;
    reformerName:string;
    status:string;
    isDone :string;
    response: LitigationRequestReformerAssigningRequestStatus;
    reconciliationPeriod : number;
}
