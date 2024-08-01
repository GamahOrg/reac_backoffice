export interface LawsuitItemDetails {
    applicantCitizen: ApplicantCitizen,
    applicantCitizenId: string,
    arbitratorsCount: number,
    contract: Contract,
    contractId: string,
    createdOn: Date,
    description: string,
    exemptionReductionCategoryId: string,
    externalStatus: Status,
    externalStatusId: number,
    fees: number,
    firstPartyArbitratorsCount: number,
    id: string,
    internalStatus: Status,
    internalStatusId: number,
    isFinancialLitigation: boolean,
    isPaid: boolean,
    isSent: boolean,
    contractAddress: string,
    city: {
        area: {
            cities: string[],
            id: string,
            litigationRequests: string[],
            areaName: string
        },
        areaId: string,
        litigationRequests: string[],
        cityName: string
    },
    area: {
        cities: string[],
        id: string,
        litigationRequests: string[],
        areaName: string
    },
    litigationRequestRequestFiles: {
        id: string,
        litigationRequestRequestId: string,
        fileManagerId: string,
        fileManager: string,
        litigationRequestRequest: string
    }[],
    litigationRequestGroundFiles: {
        id: string,
        litigationRequestGroundId: string,
        fileManagerId: string,
        fileManager: string,
        litigationRequestGround: string
    }[],
    litigationRequestAmount: {
        id: string,
        createdBy: string,
        createdOn: Date,
        updatedBy: string,
        updatedOn: Date,
        isDeleted: boolean,
        deletedBy: string,
        deletedOn: Date,
        litigationAmount: string,
        fees: number,
        litigationRequests: string[]
    },
    litigationRequestAmountId: string,
    litigationRequestCategory: {
        id: number,
        categoryName: string,
        acknowledgmentContent: string,
        termsAndConditions: string,
        bpfId: string,
        litigationRequests: string[],
        translations: {
            categoryName: string,
            acknowledgmentContent: string,
            termsAndConditions: string,
            languageCode: string
        }[]
    },
    litigationRequestCategoryId: number,
    litigationRequestCorrespondences: RequestCorrespondenc[],
    litigationRequestExtendPeriodRequests: any[],
    litigationRequestGrounds: LitigationRequestGround[],
    litigationRequestNotes: LitigationRequestNote[],
    litigationRequestOwnerType: {
        id: number,
        litigationRequestOwnerType: string,
        litigationRequests: string[],
        translations: { litigationRequestOwnerType: string, languageCode: string}[]
    },
    litigationRequestOwnerTypeId: number,
    litigationRequestReconciliationMeetings: LitigationRequestReconciliationMeeting[],
    litigationRequestRequests: {
        id: string,
        litigationRequestId: string,
        requestContent: string,
        litigationRequest: string,
        litigationRequestRequestFiles: LitigationRequestRequestFile[]
    }[],
    paidOn: Date,
    requestCode: string,
    secondPartyArbitratorsCount: number,
    sentOn: Date,
    sysExemptionReductionCategory: {
        id: string,
        createdBy: string,
        createdOn: Date,
        updatedBy: string,
        updatedOn: Date,
        isDeleted: boolean,
        deletedBy: string,
        deletedOn: Date,
        exemptionReductionCategoryName: string,
        translations: { categoryName: string, languageCode: string }[],
        litigationRequests: string[]
    },
    title: string
}

export interface ApplicantCitizen {
    birthDate: Date,
    buildingNumber: string,
    city: string,
    code: string,
    district: string,
    email: string,
    employer: string,
    facilities: Facility[],
    facilityDelegators: FacilityDelegator[],
    fax: string,
    fullName: string,
    gender: Gender,
    genderId: number,
    homeTelephone: string,
    id: string,
    identityExpiryDate: Date,
    identityFile: IdentityFile,
    identityFileId: string,
    litigationCompanyRepresentative: { citizens: string[], id: string },
    litigationCompanyRepresentativeId: string,
    litigationRequestContractFirstPartyCitizens: LitigationRequestContractFirstPartyCitizen[],
    litigationRequestContractSecondPartyCitizens: LitigationRequestContractSecondPartyCitizen[],
    litigationRequests: string[],
    mobile: string,
    otp: string,
    passCitizenId: string,
    postalCode: string,
    shortName: string,
    street: string,
    subNumber: string,
    sysRegistrationRequestCitizens: RegistrationRequestCitizen[],
    sysRegistrationRequestSourceCitizens: RegistrationRequestCitizen[],
    unitNumber: string,
    userId: string,
    workTelephone: string,
    identityType: IdentityType,
    identityNumber: string
}

export interface Facility {
    buildingNumber: string,
    citizen: string,
    citizenId: string,
    city: string,
    code: string,
    commercialRegisterNumber: string,
    district: string,
    email: string,
    facility700Number: string,
    facilityDelegators: FacilityDelegator[],
    fax: string,
    id: string,
    litigationRequestContractFirstPartyFacilities: string[],
    litigationRequestContractSecondPartyFacilities: string[],
    postalCode: string,
    street: string,
    subNumber: string,
    unitNumber: string
}

export interface FacilityDelegator {
    id: string,
    citizenId: string,
    facilityId: string,
    isActive: boolean,
    citizen: string,
    facility: string
}

export interface Gender {
    id: number,
    gender: string,
    citizens: string[],
    translations: { gender: string, languageCode: string}[]
}

export interface IdentityType {
    id: number,
    identityType: string,
    citizens: string[],
    delegationRequests: DelegationRequest[],
    translations: { identityType: string, languageCode: string }[]
}

export interface IdentityFile {
    id: string,
    createdBy: string,
    createdOn: Date,
    fileDescription: string,
    filePath: string,
    fileType: string,
    citizens: string[],
    delegationRequests: DelegationRequest[],
    litigationRequestContracts: string[],
    litigationRequestCorrespondenceFiles: LitigationRequestCorrespondenceFile[],
    litigationRequestExtendPeriodRequestFiles: LitigationRequestExtendPeriodRequestFile[],
    litigationRequestGroundFiles: LitigationRequestGroundFile[],
    litigationRequestNoteFiles: LitigationRequestNoteFile[],
    litigationRequestRequestFiles: LitigationRequestRequestFile[]
}

export interface DelegationRequest {
    id: string,
    identityTypeId: 1,
    identityNumber: string,
    birthDate: Date,
    mobile: string,
    email: string,
    sourceCitizenId: string,
    citizenId: string,
    requestedOn: Date,
    isApproved: boolean,
    approvedOn: Date,
    delegationNumber: string,
    delegationFileId: string,
    delegationFile: string,
    identityType: string
}

export interface LitigationRequestCorrespondenceFile {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    litigationRequestCorrespondenceId: string,
    fileManagerId: string,
    fileManager: string,
    litigationRequestCorrespondence: string
}

export interface LitigationRequestExtendPeriodRequestFile {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    litigationRequestExtendPeriodRequestId: string,
    fileManagerId: string,
    fileManager: string,
    litigationRequestExtendPeriodRequest: string
}

export interface LitigationRequestGroundFile {
    id: string,
    litigationRequestGroundId: string,
    fileManagerId: string,
    fileManager: {
        id: string
        fileDescription: string
        filePath: string
        fileType: string
    },
    litigationRequestGround: string
}

export interface LitigationRequestNoteFile {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    noteId: string,
    fileManagerId: string,
    fileManager: string,
    note: string
}

export interface LitigationRequestRequestFile {
    id: string,
    litigationRequestRequestId: string,
    fileManagerId: string,
    fileManager: string,
    litigationRequestRequest: string
}

export interface LitigationRequestContractFirstPartyCitizen {
    id: string,
    litigationRequestContractTypeId: number,
    contractKey: string,
    versionNumber: string,
    leaseContractFileId: string,
    firstPartyCitizenId: string,
    firstPartyFacilityId: string,
    firstPartyCapacity: string,
    secondPartyCitizenId: string,
    secondPartyFacilityId: string,
    secondPartyName: string,
    secondPartyCapacity: string,
    secondPartyIdentityNumber: string,
    secondPartyEmail: string,
    secondPartyMobile: string,
    secondPartyRegistrationRequestId: string,
    firstPartyCitizen: string,
    firstPartyFacility: FirstPartyFacility,
    leaseContractFile: LeaseContractFile,
    litigationRequestContractType: LitigationRequestContractType,
    litigationRequests: string[],
    secondPartyRegistrationRequest: SecondPartyRegistrationRequest,
    secondPartyCitizen: string,
    secondPartyFacility: SecondPartyFacility
}

export interface FirstPartyFacility {
    id: string,
    code: string,
    citizenId: string,
    facility700Number: string,
    commercialRegisterNumber: string,
    fax: string,
    email: string,
    city: string,
    district: string,
    street: string,
    postalCode: string,
    subNumber: string,
    buildingNumber: string,
    unitNumber: string,
    citizen: string,
    facilityDelegators: FacilityDelegator[],
    litigationRequestContractFirstPartyFacilities: string[],
    litigationRequestContractSecondPartyFacilities: string[]
}

export interface LeaseContractFile {
    id: string,
    createdBy: string,
    createdOn: Date,
    fileDescription: string,
    filePath: string,
    fileType: string,
    citizens: string[],
    delegationRequests: DelegationRequest[],
    litigationRequestContracts: string[],
    litigationRequestCorrespondenceFiles: LitigationRequestCorrespondenceFile[],
    litigationRequestExtendPeriodRequestFiles: LitigationRequestExtendPeriodRequestFile[],
    litigationRequestGroundFiles: LitigationRequestGroundFile[],
    litigationRequestNoteFiles: LitigationRequestNoteFile[],
    litigationRequestRequestFiles: LitigationRequestRequestFile[]
}

export interface LitigationRequestContractType {
    id: number,
    typeName: string,
    codingPrefixSymbol: string,
    acknowledgmentContent: string,
    termsAndConditions: string,
    litigationRequestContracts: string[],
    translations: {
        typeName: string,
        acknowledgmentContent: string,
        termsAndConditions: string,
        languageCode: string
    }[]
}

export interface SecondPartyRegistrationRequest {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    isDeleted: boolean,
    deletedBy: string,
    deletedOn: Date,
    identityNumber: string,
    mobile: string,
    email: string,
    cranumber: string,
    facility700Number: string,
    sourceCitizenId: string,
    citizenId: string,
    requestedOn: Date,
    isRegistrationDone: boolean,
    registrationDoneOn: Date,
    citizen: string,
    secondPartyLitigationRequestContracts: string[],
    sourceCitizen: string
}

export interface SecondPartyFacility {
    arabicFacilityName: string;
    id: string,
    code: string,
    citizenId: string,
    facility700Number: string,
    commercialRegisterNumber: string,
    fax: string,
    email: string,
    city: string,
    district: string,
    street: string,
    postalCode: string,
    subNumber: string,
    buildingNumber: string,
    unitNumber: string,
    citizen: string,
    facilityDelegators: FacilityDelegator[],
    litigationRequestContractFirstPartyFacilities: string[],
    litigationRequestContractSecondPartyFacilities: string[]
}

export interface LitigationRequestContractSecondPartyCitizen {
    id: string,
    litigationRequestContractTypeId: number,
    contractKey: string,
    versionNumber: string,
    leaseContractFileId: string,
    firstPartyCitizenId: string,
    firstPartyFacilityId: string,
    firstPartyCapacity: string,
    secondPartyCitizenId: string,
    secondPartyFacilityId: string,
    secondPartyName: string,
    secondPartyCapacity: string,
    secondPartyIdentityNumber: string,
    secondPartyEmail: string,
    secondPartyMobile: string,
    secondPartyRegistrationRequestId: string,
    firstPartyCitizen: string,
    firstPartyFacility: FirstPartyFacility,
    leaseContractFile: LeaseContractFile,
    litigationRequestContractType: LitigationRequestContractType,
    litigationRequests: string[],
    secondPartyRegistrationRequest: SecondPartyRegistrationRequest,
    secondPartyCitizen: string,
    secondPartyFacility: SecondPartyFacility
}

export interface RegistrationRequestCitizen {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    isDeleted: boolean,
    deletedBy: string,
    deletedOn: Date,
    identityNumber: string,
    mobile: string,
    email: string,
    cranumber: string,
    facility700Number: string,
    sourceCitizenId: string,
    citizenId: string,
    requestedOn: Date,
    isRegistrationDone: boolean,
    registrationDoneOn: Date,
    citizen: string,
    secondPartyLitigationRequestContracts: string[],
    sourceCitizen: string
}

export interface Contract {
    id: string,
    secondPartyBirthDate: Date,
    litigationRequestContractTypeId: 66,
    contractKey: string,
    versionNumber: string,
    leaseContractFileId: string,
    firstPartyCitizenId: string,
    firstPartyFacilityId: string,
    firstPartyCapacity: string,
    secondPartyCitizenId: string,
    secondPartyFacilityId: string,
    secondPartyName: string,
    secondPartyCapacity: string,
    secondPartyIdentityNumber: string,
    secondPartyEmail: string,
    secondPartyMobile: string,
    secondPartyRegistrationRequestId: string,
    firstPartyCitizen: string,
    firstPartyFacility: FirstPartyFacility,
    leaseContractFile: LeaseContractFile,
    litigationRequestContractType: LitigationRequestContractType,
    litigationRequests: string[],
    secondPartyRegistrationRequest: SecondPartyRegistrationRequest,
    secondPartyCitizen: any,
    secondPartyFacility: SecondPartyFacility
}

export interface Status {
    id: number,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    isDeleted: boolean,
    deletedBy: string,
    deletedOn: Date,
    requestStatus: string,
    litigationRequestExternalStatuses: string[],
    litigationRequestInternalStatuses: string[],
    translations: { requestStatus: string, languageCode: string }[]
}

export interface RequestCorrespondenc {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    litigationRequestId: string,
    litigationRequestCorrespondenceDestinationId: number,
    subject: string,
    message: string,
    litigationRequest: string,
    litigationRequestCorrespondenceDestination: {
        id: number,
        destination: string,
        translations: { destination: string, languageCode: string}[],
        litigationRequestCorrespondences: string[]
    },
    litigationRequestCorrespondenceFiles: LitigationRequestCorrespondenceFile[]
}

export interface LitigationRequestGround {
    id: string,
    litigationRequestId: string,
    title: string,
    litigationRequest: string,
    litigationRequestGroundFiles: LitigationRequestGroundFile[]
}

export interface LitigationRequestNote {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    litigationRequestId: string,
    title: string,
    notes: string,
    litigationRequest: string,
    litigationRequestNoteFiles: LitigationRequestNoteFile[]
}

export interface LitigationRequestReconciliationMeeting {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    litigationRequestId: string,
    meetingDate: Date,
    litigationRequestMeetingConfigurationId: string,
    litigationRequestMeetingStatusId: number,
    reconciliationMinutes: string,
    litigationRequestMeetingDecisionId: number,
    isFirstPartyApprove: boolean,
    firstPartyApprovedOn: Date,
    isSecondPartyApprove: boolean,
    secondPartyApprovedOn: Date,
    litigationRequest: string,
    litigationRequestMeetingConfiguration: LitigationRequestMeetingConfiguration,
    litigationRequestMeetingDecision: LitigationRequestMeetingDecision,
    litigationRequestMeetingReconciliationItems: LitigationRequestMeetingReconciliationItem[]
}

export interface LitigationRequestMeetingConfiguration {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    isDeleted: boolean,
    deletedBy: string,
    deletedOn: Date,
    from: Date,
    to: Date,
    litigationRequestMeetings: string[]
}

export interface LitigationRequestMeetingDecision {
    id: number,
    meetingDecision: string,
    translations: { meetingDecision: string, languageCode: string }[],
    litigationRequestMeetings: string[]
}

export interface LitigationRequestMeetingReconciliationItem {
    id: string,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    litigationRequestMeetingId: string,
    reconciliationItem: string,
    litigationRequestMeeting: string
}

export interface LawsuitDetailsItem {
    icon: string;
    title: string;
    value: string;
    isDownload: boolean
}