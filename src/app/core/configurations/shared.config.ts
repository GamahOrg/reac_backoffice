import { AssignedArbitrationRequestsDocumnetsComponent } from "@app/modules/features/arbitration/pages/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets.component";

export const Configuration = {
    languages: ['ar', 'en'],
    defaultLang: 'ar',
    APIs: {
        Account: {
            login: '/api/Account/Login',
            refreshToken: '/api/Account/RefreshToken',
        },
        Notification: {
            GetNotificationListForBackOffice: "/api/Notification/GetNotificationListForBackOffice",
            MarkNotificationViewed: "/api/Notification/MarkNotificationViewed",
        },
        SysFileManager: {
            Upload: '/api/SysFileManager/Upload',
            Remove: '/api/SysFileManager/Remove',
            RemoveRange: '/api/SysFileManager/RemoveRange',
        },
        Arbitration: {
            AddArbitrationExtendPeriodForEmployee: '/api/Arbitration/AddArbitrationExtendPeriodForEmployee',
            GetLitigationRequestExtendPeriodForEmployee: '/api/Arbitration/GetLitigationRequestExtendPeriodForEmployee',
            GetLitigationRequestExtendPeriodForEmployeeByRequestId: '/api/Arbitration/GetLitigationRequestExtendPeriodForEmployeeByRequestId',
            AddArbitratorSelectionDuration: '/api/Arbitration/AddArbitratorSelectionDuration',
            GetLitigationRequestForArbitratorSelectionDuration: '/api/Arbitration/GetLitigationRequestForArbitratorSelectionDuration',

            GetLitigationRequestForAddArbitratorSelectionDurationByRequestId: '/api/Arbitration/GetLitigationRequestForAddArbitratorSelectionDuration',
            GetLitigationRequestForAddArbitratorsCount: "/api/Arbitration/GetLitigationRequestForAddArbitratorsCount",
            GetLitigationRequestForAddArbitratorsCountByRequestId: "/api/Arbitration/GetLitigationRequestForAddArbitratorsCountByRequestId",

            AddArbitratorsCount: "/api/Arbitration/AddArbitratorsCount",
            GetLitigationRequestForReportExplanationRequestForArbitrator: "/api/Arbitration/GetLitigationRequestForReportExplanationRequestForArbitrator",
            GetLitigationRequestForReportExplanationRequestForArbitratorByRequestId: "/api/Arbitration/GetLitigationRequestForReportExplanationRequestForArbitrator",
            AddArbitrationReportExplanationRequestForArbitrator: "/api/Arbitration/AddArbitrationReportExplanationRequestForArbitrator",
            GetLitigationRequestArbitratorAssigningRequestsAll: "/api/LitigationRequestArbitratorAssigningRequest/GetLitigationRequestArbitratorAssigningRequestsAll",

            GetLitigationRequestForFullAllSession: '/api/ArbitrationSession/GetLitigationRequestForFullAllSession',
            GetLitigationRequestForAllSessionForArbitrator: '/api/ArbitrationSession/GetLitigationRequestForAllSessionForArbitrator',


            assignArbitrationMemeberList: '/api/Arbitration/GetLitigationRequestForAddArbitratorsNominationList',
            GetLitigationRequestForAddArbitratorsNominationListByRequestId: '/api/Arbitration/GetLitigationRequestForAddArbitratorsNominationListByRequestId',
            AddLitigationRequestArbitratorsNominationList: '/api/Arbitration/AddLitigationRequestArbitratorsNominationList',

            GetLitigationRequestForAddArbitratorsChairmanNominationList: '/api/Arbitration/GetLitigationRequestForAddArbitratorsChairmanNominationList',
            GetLitigationRequestForAddArbitratorsChairmanNominationListByRequestId: '/api/Arbitration/GetLitigationRequestForAddArbitratorsChairmanNominationListByRequestId',
            AddLitigationRequestArbitratorsChairmanNominationList: '/api/Arbitration/AddLitigationRequestArbitratorsChairmanNominationList',


            Assign: "/api/Arbitration/Assign",
            GetAllArbitrationLitigationRequest: "/api/Arbitration/GetAllArbitrationLitigationRequest",


            GetLitigationRequestForArbitratorRecusalRequestForArbitrator: "/api/Arbitration/GetLitigationRequestForArbitratorRecusalRequestForArbitrator",
            GetLitigationRequestForArbitratorRecusalRequestForArbitratorByRequestId: "/api/Arbitration/GetLitigationRequestForArbitratorRecusalRequestForArbitratorByRequestId",
            AddArbitrationReportArbitratorRecusalForArbitrator: "/api/Arbitration/AddArbitrationReportArbitratorRecusalForArbitrator",

            GetLitigationAcceptanceOrRejectDocumentData: "/api/LitigationRequest/GetLitigationAcceptanceOrRejectDocumentData",
            AddLitigationRequestArbitratorsChairmandecision: "/api/Arbitration/AddLitigationRequestArbitratorsChairmandecision"

        },
        SysArbitratorCount: {
            Get: "/api/SysArbitratorCount/Get"
        },
        Reconciliation: {
            AddReconciliationExtendPeriodForEmployee: '/api/Reconciliation/AddReconciliationExtendPeriodForEmployee',
            GetLitigationRequestExtendPeriodForEmployee: '/api/Reconciliation/GetLitigationRequestExtendPeriodForEmployee',
            GetLitigationRequestReformerAssigningRequestsAll: '/api/LitigationRequestReformerAssigningRequest/GetLitigationRequestReformerAssigningRequestsAll',
            GetLitigationRequestExtendPeriodForEmployeeByRequestId: '/api/Reconciliation/GetLitigationRequestExtendPeriodForEmployeeByRequestId',
            GetLitigationRequestForFullAllSession: '/api/Reconciliation/GetLitigationRequestForFullAllSession',
            GetLitigationRequestForFullAllReformer: '/api/Reconciliation/GetLitigationRequestForFullAllReformer',
            Assign: '/api/Reconciliation/Assign',
        },
        LitigationRequest: {
            AuditngList: '/api/LitigationRequest/AuditngList',
            AuditngListArbitration: '/api/LitigationRequest/AuditngListArbitration',
            AuditngListReconciliation: '/api/LitigationRequest/AuditngListReconciliation',
            GetLitigationById: '/api/LitigationRequest/GetLitigationById',
            GetAuditNotesById: "/api/LitigationRequest/GetAuditNotesById",
        },
        WorkFlowProcessingLog: {
            GetAuditNotesById: "/api/WorkFlowProcessingLog/GetAuditNotesById",
        },
        BpfService: {
            ProcessWorkFlow: "/api/BpfService/ProcessWorkFlow",
            GetWorkflowStepEventsForEmployee: "/api/BpfService/GetWorkflowStepEventsForEmployee/requestId",
            GetRequestLogForEmployee : "/api/BpfService/GetRequestLogForEmployee/requestId"
        },
        citizenRequests: {
            GetCitizenRequestsForEmployee: '/api/CitizenRequest/GetCitizenRequestsForEmployee',
            GetCitizenRequestById: '/api/CitizenRequest/GetCitizenRequestById',
            SaveCitizenRequest: '/api/CitizenRequest/SaveCitizenRequest',
            ExecuteAction: '/api/CitizenRequest/ExecuteAction',
        },
        ArbitratorClass: {
            GetArbitratorClasses: '/api/SysArbitratorClass/GetArbitratorClasses',
            GetArbitratorClass: '/api/SysArbitratorClass/GetArbitratorClass',
        },
        Citizen: {
            AddArbitratorFreeUpDecision: "/api/Citizen/AddArbitratorFreeUpDecision",
            AddArbitratorStopDecision: "/api/Citizen/AddArbitratorStopDecision",
            AddReformerFreeUpDecision: "/api/Citizen/AddReformerFreeUpDecision",
            AddReformerStopDecision: "/api/Citizen/AddReformerStopDecision",
            GetReformersDecisions: "/api/Citizen/GetReformersDecisions",
            GetReformersDecisionsByCitizenId: "/api/Citizen/GetReformersDecisionsByCitizenId",
            GetArbitratorsDecisions: "/api/Citizen/GetArbitratorsDecisions",
            GetArbitratorsDecisionsByCitizenId: "/api/Citizen/GetArbitratorsDecisionsByCitizenId",
            GetReformersLookup: "/api/Citizen/GetReformersLookup",
            GetArbitratorsFullLookup: "/api/Citizen/GetArbitratorsFullLookup",
            GetArbitratorsLookup: "/api/Citizen/GetArbitratorsLookup",
        },
    },
    modules: {
        auth: 'auth',
        lawsuits: 'Lawsuits',
        citizenRequests: 'citizen-requests',
        arbitration: "arbitration"
    },
    pages: {
        auth: {
            login: "login",
        },
        arbitration: {
            arbitratorCountList: "arbitrator-count-list",
            arbitratorCountDetails: "arbitrator-count-details",
            assignedArbitrationRequests: 'assigned-arbitration-requests',
            arbitratorSessionList: "arbitrator-session-list",
            assignarbitratorlist: 'assign-arbitrator-list',
            arbitratorRecusalRequests: 'arbitrator-recusal-requests',
            approveOrRejectArbitrattionRecusalRequest: 'approve-or-reject-arbitrator-recusal-request',
            assignedArbitrationRequestsDocumnets: 'assigned-arbitration-request-documents'
        },
        lawsuits: {
            lawsuitList: "lawsuit-list",
            lawsuitTypes: "lawsuit-types",
            createLawsuit: "create-lawsuit",
            editLawsuit: "edit-lawsuit",
            lawsuitDetails: "lawsuit-details",
            AuditngListReconciliation: 'auditng-list-reconciliation',
            AuditngListArbitration: 'auditng-list-arbitration'
        },
        citizenRequests: {
            arbitratorRequestList: 'arbitrator-request-list',
            reformerRequestList: 'reformer-request-list',
            details: 'details',
            requestToExtendSettlementPeriodList: 'request-extend-settlement-period-list',
            reformerassigningrequestforall: 'reformer-assigning-request-for-all',
            requestToExtendSettlementPeriodDetails: 'request-extend-settlement-period-details',
            stopAndReleaseReformer: "stop-and-release-reformer",
            stopAndReleaseArbitrator: "stop-and-release-arbitrator",
            arbitratorDecisionDetails: "arbitrator-decision-details",
            reformerDecisionDetails: "reformer-decision-details",
            sessionList: 'session-list',
            reformerList: 'refomer-list',
            requestToExtendArbitrationPeriodList: 'request-extend-arbitration-period-list',
            requestToExtendArbitrationPeriodDetails: 'request-extend-arbitration-period-details',
            litigationRequestForArbitratorSelectionDurationList: 'arbitrator-selection-duration-List',
            litigationRequestForArbitratorSelectionDurationDetails: 'arbitrator-selection-duration-details',
            assignArbitrationHeadList: 'assign-arbitration-head-list',
            assignArbitrationHeadDetails: 'assign-arbitration-head-details',
            assignArbitrationMemberList: 'assign-arbitration-member-list',
            assignArbitrationMemberDetails: 'assign-arbitration-member-details',

        },
    },
    validators: {
        regexLat:
            '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,20})?))$',
        regexLng:
            '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,20})?))$',
        phonePattern: '^([^A-Za-z])+$',
        emailPattern: '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}',
        // SA Phone
        PhoneNumber: '^(05)([0-9]{8})$',
        numberOnly: '^[0-9]+$',
        decimal: '^[0-9][0-9]*[.]?[0-9]{0,2}$',
        noArabicLetters: "^[a-zA-Z0-9$@$!%*?&#^-_. +]+$"
    },
    OTPInputConfigration: {
        length: 6,
        direction: 'ltr'
    },
    httpResponseStatusCode: {
        unknownError: 0,
        // Client error responses
        badRequest: 400,
        unauthorized: 401,
        paymentRequiredExperimental: 402,
        forbidden: 403,
        notFound: 404,
        methodNotAllowed: 405,
        notAcceptable: 406,
        proxyAuthenticationRequired: 407,
        requestTimeout: 408,
        conflict: 409,
        gone: 410,
        lengthRequired: 411,
        // Server error responses
        internalServerError: 500,
        notImplemented: 501,
        badGateway: 502,
        serviceUnavailable: 503,
        gatewayTimeout: 504,
        hTTPVersionNotSupported: 505,
        variantAlsoNegotiates: 506,
        insufficientStorage: 507,
        loopDetected: 508,
        notExtended: 510,
        networkAuthenticationRequired: 511,
    },
};
