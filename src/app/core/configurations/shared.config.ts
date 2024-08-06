export const Configuration = {
    languages: ['ar', 'en'],
    defaultLang: 'ar',
    APIs: {
        Account: {
            login: '/api/Account/Login',
            refreshToken: '/api/Account/RefreshToken',
        },
        SysFileManager: {
            Upload: '/api/SysFileManager/Upload',
            Remove: '/api/SysFileManager/Remove',
            RemoveRange: '/api/SysFileManager/RemoveRange',
        },
        Reconciliation:{
            AddReconciliationExtendPeriodForEmployee: '/api/Reconciliation/AddReconciliationExtendPeriodForEmployee',
            GetLitigationRequestExtendPeriodForEmployee: '/api/Reconciliation/GetLitigationRequestExtendPeriodForEmployee',
            GetLitigationRequestExtendPeriodForEmployeeByRequestId: '/api/Reconciliation/GetLitigationRequestExtendPeriodForEmployeeByRequestId',
            GetLitigationRequestForFullAllSession:'/api/Reconciliation/GetLitigationRequestForFullAllSession',
            GetLitigationRequestForFullAllReformer:'/api/Reconciliation/GetLitigationRequestForFullAllReformer',
            Assign:'/api/Reconciliation/Assign',
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
            GetWorkflowStepEventsForEmployee: "/api/BpfService/GetWorkflowStepEventsForEmployee/requestId"
        }, citizenRequests: {
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
        },
    },
    modules: {
        auth: 'auth',
        lawsuits: 'Lawsuits',
        citizenRequests: 'citizen-requests'
    },
    pages: {
        auth: {
            login: "login",
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
            requestToExtendSettlementPeriodList:'request-extend-settlement-period-list',
            requestToExtendSettlementPeriodDetails:'request-extend-settlement-period-details',
            stopAndReleaseReformer: "stop-and-release-reformer",
            stopAndReleaseArbitrator: "stop-and-release-arbitrator",
            arbitratorDecisionDetails: "arbitrator-decision-details",
            reformerDecisionDetails: "reformer-decision-details",
            sessionList:'session-list',
            reformerList:'refomer-list'
        }
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
