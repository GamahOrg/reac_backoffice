import { CitizenRequestStatus } from "./enums/citizen-request-status.model";
import { CitizenRequestAction, CitizenRequestType } from "./enums/citizen-request-type.model";

export interface CitizenRequestShortDataDto {
    id: string;
    citizenRequestTypeId:number;
    citizenRequestType: string;
    areaName: string | null;
    academicDegreeName: string;
    isVolunteerApproval: boolean | null;
    experienceYears: number | null;
    arbitratorClassName: string | null;
    statusName: string;
    citizenName: string;
    identityNumber: string
}

export interface CitizenRequestCreateUpdateDto {
    id: string;
    citizenRequestTypeId: CitizenRequestType;
    areaId: string | null|undefined;
    isVolunteerApproval: boolean;
    isSend: boolean;
    academicDegreeName: string;
    experienceYears: number | null;
    arbitratorClassId: string | null;
    brief: string | null;
    citizenRequestFreelanceWorkDocumentFiles: CitizenRequestFreelanceWorkDocumentFileCreateUpdateDto[];
    citizenRequestAcademicDegreeFiles: CitizenRequestAcademicDegreeFileCreateUpdateDto[];
    citizenRequestExperienceCertificates: CitizenRequestExperienceCertificateCreateUpdateDto[];
}

export interface CitizenRequestFullDataDto {

    id: string;
    citizenId: string;
    fees: string;
    areaId?: string;
    isVolunteerApproval: boolean;
    academicDegreeName: string;
    experienceYears: number | null;
    arbitratorClassId: string | null;
    statusId: CitizenRequestStatus;
    brief: string | null;
    sysArbitratorClass: SysArbitratorClassDto | null;
    citizen: CitizenShortDto;
    sysArea: SysAreaDto | null;
    status: SysCitizenRequestStatusDto;
    citizenRequestFreelanceWorkDocumentFiles: CitizenRequestFreelanceWorkDocumentFileFullDataDto[];
    citizenRequestAcademicDegreeFiles: CitizenRequestAcademicDegreeFileFullDataDto[];
    citizenRequestExperienceCertificates: CitizenRequestExperienceCertificateFullDataDto[];
    citizenRequestNotes: CitizenRequestNoteCreateUpdateDto[];    
}

export interface SysArbitratorClassDto {
    id: string;
    arbitratorClassName: string;
}

export interface SysAreaDto {
    id: string;
    areaName: string;
}
export interface SysCitizenRequestStatusDto {
    id: number;
    requestStatus: string;
}
export interface CitizenShortDto {
    id: string;
    identityNumber: string;
    fullName: string;
    mobile: string;
    homeTelephone: string | null;
    workTelephone: string | null;
    fax: string | null;
    email: string;
}

export interface CitizenRequestFreelanceWorkDocumentFileCreateUpdateDto {
    id: string;
    freelanceWorkDocumentFileId: string;
}

export interface CitizenRequestAcademicDegreeFileCreateUpdateDto {
    id: string;
    academicDegreeFileId: string;
}

export interface CitizenRequestExperienceCertificateCreateUpdateDto {
    id: string;
    certificateName: string;
    acquisitionDate: string;
    issuingEntityName: string;
    citizenRequestExperienceCertificateFiles: CitizenRequestExperienceCertificateFileCreateUpdateDto[];
}

export interface CitizenRequestExperienceCertificateFileCreateUpdateDto {
    id: string;
    experienceCertificateFileId: string;
    experienceCertificateFile?:SysFileManagerCreateUpdateDto
}

export interface CitizenRequestFreelanceWorkDocumentFileFullDataDto {
    id: string;
    freelanceWorkDocumentFile: SysFileManagerCreateUpdateDto;
}

export interface CitizenRequestAcademicDegreeFileFullDataDto {
    id: string;
    academicDegreeFile: SysFileManagerCreateUpdateDto;
}

export interface CitizenRequestExperienceCertificateFullDataDto {
    id: string;
    certificateName: string;
    acquisitionDate: Date;
    issuingEntityName: string;
    citizenRequestExperienceCertificateFiles: CitizenRequestExperienceCertificateFileFullDataDto[];
}

export interface CitizenRequestExperienceCertificateFileFullDataDto {
    id: string;
    experienceCertificateFile: SysFileManagerCreateUpdateDto;
}

export interface CitizenRequestNoteCreateUpdateDto {
    id: string;
    citizenRequestId: string;
    notes: string;
}

export interface SysFileManagerCreateUpdateDto {
    id: string;
    fileDescription: string | null;
    filePath: string;
    fileType: string;
}

export interface CitizenRequestActionModel {
    citizenRequestAction: CitizenRequestAction;
    requestId: string;
    notes: string | null;
}