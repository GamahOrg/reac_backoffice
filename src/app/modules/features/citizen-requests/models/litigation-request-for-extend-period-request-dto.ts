import { SysFileManagerCreateUpdateDto } from "@app/shared/models/sys-file-manager-create-update-dto";
import { LitigationRequestContractType } from "../../lawsuits/models/lawsuit-details.model";

export interface LitigationRequestForExtendPeriodRequestDto {
     allowAdd :boolean;
    allowDecision :boolean;
   
     litigationRequestShortDto :LitigationRequestShortDto;
     litigationRequestExtendPeriodRequestCreateUpdateDto:LitigationRequestExtendPeriodRequestCreateUpdateDto
}

export interface LitigationRequestExtendPeriodRequestCreateUpdateDto
{
    id:string;
  litigationRequestId :string;

    requiredDays :number;
    requestReason :string;
   
   
    reason :string;
   
    notes :string;
   
    litigationRequestExtendPeriodRequestStatusId :number;
   
     finishStatusReason :string;
   
     litigationRequestExtendPeriodRequestFiles :LitigationRequestExtendPeriodRequestFileCreateUpdateDto[];
}
export interface LitigationRequestExtendPeriodRequestFileCreateUpdateDto
{
    id:string;
     litigationRequestExtendPeriodRequestId :string;

      fileManager :SysFileManagerCreateUpdateDto;
}
export interface LitigationRequestReconciliationReportCreateUpdateDto
{
id:string;
LitigationRequestId :string;

ReportDate:Date;

reconciliationSessionDetails:string;

modificationRequest:string;
litigationRequestMeetingReconciliationItems:LitigationRequestReconciliationReportItemCreateUpdateDto[];
}
export interface LitigationRequestShortDto
{
    id:string;
    requestCode :string;
    cityName :string;
   areaName :string;
   contractAddress :string; // العنوان الوطني

mintuesOfMeetingApprovalPlaintiffStatusOn :Date;
mintuesOfMeetingApprovalDefendantStatusOn :Date;

title :string;
description :string;
isFinancialLitigation :boolean;
isExemptionReduction:boolean;
applicantCitizen: CitizenShortDto;
contract: LitigationRequestContractShortDto;
externalStatus: SysLitigationRequestStatusDto;
internalStatus: SysLitigationRequestStatusDto;
litigationRequestAmount: SysLitigationRequestAmountCreateUpdateDto;
litigationRequestCategory: SysLitigationRequestCategoryDto | null;
sysExemptionReductionCategory: SysExemptionReductionCategoryDto | null;
litigationRequestOwnerType: SysLitigationRequestOwnerTypeDto;
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
}export interface LitigationRequestContractShortDto {
    id: string;

    litigationRequestContractTypeId: LitigationRequestContractType;
    contractKey: string;
    versionNumber: string | null;
    associationName: string | null;
    firstPartyCapacity: string;
    secondPartyCapacity: string;
    firstPartyCitizen: CitizenShortDto | null;
    firstPartyFacility: FacilityShortDto | null;
    secondPartyCitizen: CitizenShortDto | null;
    secondPartyFacility: FacilityShortDto | null;
    contractFile: SysFileManagerCreateUpdateDto | null;
    associationRegistrationCertificateFile: SysFileManagerCreateUpdateDto | null;
    foundingLetterFile: SysFileManagerCreateUpdateDto | null;
    internalRegulationsFile: SysFileManagerCreateUpdateDto | null;
    litigationRequestContractType: SysLitigationRequestContractTypeGetDto;
}

export interface FacilityShortDto {
    id: string;
    code: string | null;
    arabicFacilityName: string;
    englishFacilityName: string;
    facility700Number: string;
    commercialRegisterNumber: string | null;
}

export interface SysLitigationRequestContractTypeGetDto {
    id: string;
    typeName: string;
    codingPrefixSymbol: string;
}

export interface SysLitigationRequestStatusDto {
    id: string;
    requestStatus: string;
}

export interface SysLitigationRequestAmountCreateUpdateDto {
    id: string;
    litigationAmount: string;
    fees: number;
}

export interface SysLitigationRequestCategoryDto {
    id: string;
    categoryName: string;
    acknowledgmentContent: string | null;
    termsAndConditions: string | null;
    bpfId: string;
}

export interface SysExemptionReductionCategoryDto {
    id: string;
    exemptionReductionCategoryName: string;
}

export interface SysLitigationRequestOwnerTypeDto {
    id: string;
    litigationRequestOwnerType: string;
}


export interface WritingMinutesOfTheMeetingRequestPayload {
    requestId: string;
    reconciliationSessionDetails: string;
    modificationRequest: string | null;
    uploadedFilesIds: string[] | null;
    litigationRequestMeetingReconciliationItems: LitigationRequestReconciliationReportItemCreateUpdateDto[];
}

export interface LitigationRequestReconciliationReportItemCreateUpdateDto  {
    id: string;
    reconciliationItem: string;
}

export interface LitigationRequestForReportDto {
    allowAdd: boolean;
    litigationRequestShortDto: LitigationRequestShortDto | null;
    report: LitigationRequestReconciliationReportCreateUpdateDto | null;
}

export interface LitigationRequestReconciliationReportCreateUpdateDto  {
    id: string;
    litigationRequestId: string;
    reportDate: string;
    reconciliationSessionDetails: string;
    modificationRequest: string;
    litigationRequestMeetingReconciliationItems: LitigationRequestReconciliationReportItemCreateUpdateDto[];
}
export interface LitigationRequestReconciliationReportItemCreateUpdateDto{
    id:string;
    reconciliationItem:string;
}
