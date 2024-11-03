import { SysFileManagerCreateUpdateDto } from "@app/shared/models/sys-file-manager-create-update-dto";
import { CitizenShortDto } from "../../citizen-requests/models/citizen-request.model";
import { LitigationRequestShortDto } from "./arbitration-request.model";

export interface LitigationRequestCorrespondenceCreateUpdateDto {
    id: string | null;
    createdBy: string | null;
    createdOn: string | null;
    litigationRequestId: string;
    litigationRequestCategoryId: string;
    subject: string;
    message: string;
    correspondenceFileId: string | null;
    LitigationRequestCorrespondenceDestinationId : number | null;
}

export interface LitigationRequestForCorrespondences{
    litigationRequestShortDto : LitigationRequestShortDto;
    allowAdd : boolean;
    correspondences: LitigationRequestCorrespondencesDto[] | undefined;
}

export interface LitigationRequestCorrespondencesDto{
    id: string | null;
    createdBy: string | null;
    createdOn: string | null;
    litigationRequestId: string;
    subject: string;
    message: string;
    citizen:CitizenShortDto;
    litigationRequestCorrespondenceFiles : SysFileManagerCreateUpdateDto[];
    litigationRequestCorrespondenceReply : LitigationRequestCorrespondenceReplyDto[];

}

export interface LitigationRequestCorrespondenceReplyDto{
    id: string | null;
    createdBy: string | null;
    createdOn: string | null;
    litigationRequestId: string;
    replyMessage: string;
    citizen:CitizenShortDto;
    litigationRequestCorrespondenceFiles : SysFileManagerCreateUpdateDto[];
}