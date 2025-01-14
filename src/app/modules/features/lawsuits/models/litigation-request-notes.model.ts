import { LitigationRequestShortDto } from "../../arbitration/models/arbitration-request.model";
import { CitizenShortDto, SysFileManagerCreateUpdateDto } from "../../citizen-requests/models/citizen-request.model";

export interface LitigationRequestNoteCreateUpdateDto {
    id: string | null;
    createdBy: string | null;
    createdOn: string | null;
    updatedBy: string | null;
    updatedOn: string | null;
    litigationRequestId: string;
    litigationRequestCategoryId: string;
    title: string;
    notes: string;
    notesFileId: string | null;
}

export interface LitigationRequestForNotes{
    litigationRequestShortDto : LitigationRequestShortDto;
    allowAdd : boolean;
    notes: LitigationRequestNotesDto[] | undefined;
}

export interface LitigationRequestNotesDto{
    id: string | null;
    createdBy: string | null;
    createdOn: string | null;
    updatedBy: string | null;
    updatedOn: string | null;
    litigationRequestId: string;
    title: string;
    notes: string;
    citizen:CitizenShortDto;
    litigationRequestNoteFiles : SysFileManagerCreateUpdateDto[];

}