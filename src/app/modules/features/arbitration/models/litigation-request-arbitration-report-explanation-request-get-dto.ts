import { SysFileManagerCreateUpdateDto } from "@app/shared/models/sys-file-manager-create-update-dto";
import { LitigationRequestShortDto } from "./arbitration-request.model";
import { ApproveRejectStatus, LitigationRequestParty } from "./enums/arbitrator-recusal";

export interface LitigationRequestArbitrationReportExplanationRequestGetDto {
    id:string;
    explanationRequests :string;
    explanationRequestDate:Date
    response:string;
    responseOn :Date
   litigationRequestArbitrationReportExplanationRequestFiles:LitigationRequestArbitrationReportExplanationRequestFileGetDto[];
}
export interface LitigationRequestArbitrationReportExplanationRequestFileGetDto
{
   id:string;
 explanationRequestFile?:SysFileManagerCreateUpdateDto
}


export interface LitigationRequestForArbitratorRecusalRequestDto{
   allowAdd : boolean;
   litigationRequestShortDto : LitigationRequestShortDto;
   request : LitigationRequestArbitratorRecusalRequestGetDto 
}

export interface LitigationRequestArbitratorRecusalRequestGetDto {
   id : string;
   litigationRequestId : string;
   arbitratorCitizenId : string;
   reason : string;
   requestOn : string;
   fullName : string;
   requestParty : LitigationRequestParty;
   approveRejectStatus : ApproveRejectStatus;
   ResponseOn : string;
   litigationRequestArbitratorRecusalRequestFiles : LitigationRequestArbitratorRecusalRequestFiles[]
}

export interface LitigationRequestArbitratorRecusalRequestFiles{
   id : string;
   recusalRequestFile : SysFileManagerCreateUpdateDto
}