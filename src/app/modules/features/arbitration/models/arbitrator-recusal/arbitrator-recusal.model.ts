import { SysFileManagerCreateUpdateDto } from "@app/shared/models/sys-file-manager-create-update-dto";
import { LitigationRequestShortDto } from "../arbitration-request.model";
import { ApproveRejectStatus, LitigationRequestParty } from "../enums/arbitrator-recusal";

export interface LitigationRequestArbitrationRecusalRequestResponseDto{
    id: string | undefined;
    litigationRequestId : string | undefined;
    response : ApproveRejectStatus
}


export interface LitigationRequestMircoExplanationRequestDto{
    id: string;
    requestCode: string | null;
    requestDate: string;
    firstPartyName: string;
    secondPartyName: string;
    requestParty: LitigationRequestParty;
    requestTypeName: string;
    status: string;
    isDone: string;
    IsResponseDone: string;
}

export interface LitigationRequestArbitrationReportExplanationRequestGetDto {
    id : string;
    ExplanationRequestDate : string;
    ExplanationRequests : string;
    Response : string;
    LitigationRequestArbitrationReportExplanationRequestFiles : LitigationRequestArbitrationReportExplanationRequestFileGetDto[];
    
}

export interface LitigationRequestArbitrationReportExplanationRequestFileGetDto{
    id : string;
    explanationRequestFile : SysFileManagerCreateUpdateDto
}