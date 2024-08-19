import { LitigationRequestReformerAssigningRequestStatus } from "../enums/litigation-request-reformer-assigning-request-status";

export interface LitigationAcceptOrRejectDocumentDto{
arbitratorName : string;
firstPartyName : string;
secondPartyName : string;
associationName : string;
contractNumber : string;
contractReleaseDate : string;
litigationNumber : string;
litigationType : string;
subject : string;
arbitratorAssignerName : string;
arbitratorAssigningDate : string;
arbitratorAssigningCost : string;
response : LitigationRequestReformerAssigningRequestStatus
requestTypeId: number;

}