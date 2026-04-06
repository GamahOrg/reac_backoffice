import { CitizenShortDto, SysFileManagerCreateUpdateDto } from "../../citizen-requests/models/citizen-request.model";
import { litigationRequestContractType, litigationRequestExtendPeriodRequestStatus } from "./enums/arbitration-request-contract-type";
import { LitigationRequestParty } from "./enums/arbitrator-recusal";
import { ArbitratorAssigningRequestType, LitigationRequestReformerAssigningRequestStatus } from "./enums/litigation-request-reformer-assigning-request-status";


export interface ArbitrationRequests{
    currentPage: number,
    pageCount: number,
    pageSize: number,
    totalCount: number,
    results : CustomLitigationRequestMircoArbitratorDto[]

}


export interface ScheduleSessionProcessRequestPayload {
    requestId: string;
    sessionDateTime: string;
}

export interface LitigationRequestMircoDto {
    id: string;
    requestCode: string | null;
    requestDate: string;
    firstPartyName: string;
    secondPartyName: string;
    requestParty?: LitigationRequestParty;
    requestTypeName: string;
    status: string;
    isDone: string;
    response?: LitigationRequestReformerAssigningRequestStatus;
    requestId?: string;
    submissionDate?: string | null;
    auditorAcceptanceDate?: string | null;
    arbitratorAcceptanceDate?: string | null;
    judgmentDate?: string | null;
    arbitratorName?: string | null;
}

export class ArbitrationRequestDocumentContent{
    documentContent : CustomLitigationRequestMircoArbitratorDto | undefined
}

export interface CustomLitigationRequestMircoArbitratorDto{
    id: string;
    requestCode: string | null;
    requestDate: string;
    arbitratorName: string | null;
    firstPartyName: string;
    secondPartyName: string;
    requestTypeName: string;
    requestTypeId: number;
    arbitrationPeriod: number;
    status: string;
    isDone: string;
    requestId?: string;
    arbitratorAssigningRequestType: ArbitratorAssigningRequestType ;
    responseOn: string;
    response : LitigationRequestReformerAssigningRequestStatus
}

export interface LitigationRequestForSessionDto {
    litigationRequestShortDto: LitigationRequestShortDto | null;
    allowAdd: boolean;
    sessions: LitigationRequestSessionCreateUpdateDto[] | null;
    litigationRequestExtendPeriodRequestCreateUpdateDto: LitigationRequestExtendPeriodRequestCreateUpdateDto;
}

export interface LitigationRequestSessionCreateUpdateDto {
    id: string;
    litigationRequestId: string;
    sessionDatetime: string;
    sessionUrl: string | null;
}
export interface LitigationRequestExtendPeriodRequestCreateUpdateDto {
    litigationRequestId: string | undefined;
    requiredDays: string | null;
    requestReason: string | null;
    notes: string | null;
    finishStatusReason: string | null;
    litigationRequestExtendPeriodRequestStatusId: number | null;
    files: string[];
    litigationRequestExtendPeriodRequestFiles: LitigationRequestExtendPeriodRequestFiles[];
}

export interface LitigationRequestExtendPeriodRequestFiles{
    fileManager : SysFileManagerCreateUpdateDto;
}

export interface LitigationRequestShortDto {
    id: string;
    requestCode: string | null;
    cityName: string | null;
    areaName: string | null;
    contractAddress: string | null;
    mintuesOfMeetingApprovalPlaintiffStatusOn: string | null;
    mintuesOfMeetingApprovalDefendantStatusOn: string | null;
    title: string | null;
    description: string | null;
    isFinanciallitigation: boolean | null;
    isExemptionReduction: boolean | null;
    applicantCitizen: CitizenShortDto;
    defendantCitizen: CitizenShortDto;
    defendantFacility: FacilityShortDto | null;
    contract: LitigationRequestContractShortDto;
    externalStatus: SyslitigationRequestStatusDto;
    internalStatus: SyslitigationRequestStatusDto;
    litigationRequestAmount: SyslitigationRequestAmountCreateUpdateDto;
    litigationRequestCategory: SyslitigationRequestCategoryDto | null;
    sysExemptionReductionCategory: SysExemptionReductionCategoryDto | null;
    litigationRequestOwnerType: SyslitigationRequestOwnerTypeDto;
    arbitratorsCount: number | null;
    isFinancialLitigation?: boolean | null;
    arbitratorCitizen?: ArbitratorCitizenDto;
}

export interface LitigationRequestContractShortDto {
    id: string;

    litigationRequestContractTypeId: litigationRequestContractType;
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
    litigationRequestContractType: SyslitigationRequestContractTypeGetDto;
}

export interface FacilityShortDto {
    id: string;
    code: string | null;
    arabicFacilityName: string;
    englishFacilityName: string;
    facility700Number: string;
    commercialRegisterNumber: string | null;
}

export interface SyslitigationRequestContractTypeGetDto {
    id: string;
    typeName: string;
    codingPrefixSymbol: string;
}

export interface SyslitigationRequestStatusDto {
    id: string;
    requestStatus: string;
}

export interface SyslitigationRequestAmountCreateUpdateDto {
    id: string;
    litigationAmount: string;
    fees: number;
}

export interface SyslitigationRequestCategoryDto {
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

export interface SyslitigationRequestOwnerTypeDto {
    id: string;
    litigationRequestOwnerType: string;
}


export interface WritingMinutesOfTheMeetingRequestPayload {
    requestId: string;
    reconciliationSessionDetails: string;
    modificationRequest: string | null;
    uploadedFilesIds: string[] | null;
    litigationRequestMeetingReconciliationItems: litigationRequestReconciliationReportItemCreateUpdateDto[];
}

export interface litigationRequestReconciliationReportItemCreateUpdateDto  {
    id: string;
    reconciliationItem: string;
}

export interface litigationRequestForReportDto {
    allowAdd: boolean;
    litigationRequestShortDto: LitigationRequestShortDto | null;
    report: litigationRequestReconciliationReportCreateUpdateDto | null;
}

export interface litigationRequestReconciliationReportCreateUpdateDto  {
    id: string;
    litigationRequestId: string;
    reportDate: string;
    reconciliationSessionDetails: string;
    modificationRequest: string | null;
    litigationRequestMeetingReconciliationItems: litigationRequestReconciliationReportItemCreateUpdateDto[];
}

export interface ArbitratorCitizenDto {
    id: string;
    identityNumber: string;
    fullName: string;
    mobile: string;
    homeTelephone: string | null;
    workTelephone: string | null;
    fax: string | null;
    email: string;
    signtureFile?: string | null;
    city?: { id: string; cityName: string } | null;
}

export interface LitigationRequestForArbitrationReportDto {
    allowAdd: boolean;
    litigationRequestShortDto: LitigationRequestShortDto | null;
    report: LitigationRequestArbitrationReportCreateUpdateDto | null;
}

export interface LitigationRequestArbitrationReportCreateUpdateDto {
    id: string;
    litigationRequestId: string;
    judgmentDate: string;
    facts: string;
    reasons: string;
    judgmentDecisionText: string;
    modificationRequest: string;
    judgmentDecisionDate: string;
    judgmentDecisionPlace: string;
    meetingLocationId: string;
    arbitratorCitizenName: string;
    meetingLocationName?: string;
    isPublished?: boolean;
}

export interface ArbitrationReportDto {
    requestId: string;
    facts: string;
    reasons: string;
    judgmentDecisionText: string;
    modificationRequest: string;
    judgmentDecisionDate: string;
    judgmentDecisionPlace: string;
    meetingLocationId: string;
}

export interface LitigationRequestReportAdminFilterDto {
    requestCode?: string | null;
    arbitratorName?: string | null;
    partyName?: string | null;
    submissionDateFrom?: string | null;
    submissionDateTo?: string | null;
    auditorAcceptanceDateFrom?: string | null;
    auditorAcceptanceDateTo?: string | null;
    arbitratorAcceptanceDateFrom?: string | null;
    arbitratorAcceptanceDateTo?: string | null;
    judgmentDateFrom?: string | null;
    judgmentDateTo?: string | null;
}