import { LitigationRequestReformerAssigningRequestStatus } from "./enums/litigation-request-reformer-assigning-request-status";

export interface LitigationReconciliationTaskAcceptOrRejectDocumentDto{
    reformerName : string;
    firstPartyName : string;
    secondPartyName : string;
    associationName : string;
    contractNumber : string;
    contractReleaseDate : string;
    litigationNumber : string;
    litigationType : string;
    subject : string;
    reformerAssignerName : string;
    reformerAssigningDate : string;
    reformerAssigningCost : string;
    response : LitigationRequestReformerAssigningRequestStatus
    requestTypeId: number;
    rejectReason: string;
    signtureFile:string;
    }