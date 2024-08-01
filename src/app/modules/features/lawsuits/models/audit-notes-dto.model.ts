import { SysFileManagerCreateUpdateDto } from "@app/shared/models/sys-file-manager-create-update-dto";

export interface AuditNotesDto {
    Subject: string;
    notes: string;
    createdOn: Date;
    workFlowProcessingLogFiles: workFlowProcessingLogFiles[],

}
export interface workFlowProcessingLogFiles{
    fileManager:SysFileManagerCreateUpdateDto;
    id:string
}