import { AssignedArbitrationRequestsDocumnetsComponent } from "@app/modules/features/arbitration/pages/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets.component";
import { ReviewDashbourdComponent } from "@app/modules/reports/components/litigation/review-dashbourd/review-dashbourd.component";

export const Configuration = {
  languages: ['ar', 'en'],
  defaultLang: 'ar',
  environments: {
    development: {
      production: false,
      baseURL: "https://localhost:7156",
      securityURl: "http://localhost:7144",
      // securityURl: "http://192.168.194.183:222",
      // baseURL: "http://192.168.194.183:3333",
    },
    testingAndStaging: {
      production: true,
      baseURL: "http://192.168.194.183:3333",
      securityURl: "http://192.168.194.183:222",
    },
    production: {
      production: true,
      baseURL: "http://192.168.194.183:3333",
      securityURl: "http://192.168.194.183:222",
    },
  },
  APIs: {
    SysLitigationRequestAmount: {
      Get: "/api/SysLitigationRequestAmount/Get",
   },
    LitigationRequestNote: {
      GetLitigationRequestNotesForBackoffice: "/api/LitigationRequestNote/GetLitigationRequestNotesForBackoffice",
      getNoteById: "/api/LitigationRequestNote/GetLitigationNotes"
    },
    OTP: {
      getZoomMeetingDetails: '/api/OTP/GetZoomMeeting'
    },
    Account: {
      login: '/api/Account/Login',
      refreshToken: '/api/Account/RefreshToken',
    },
    LitigationRequestCorrespondence: {
      addCorrespondence: "/api/LitigationRequestCorrespondence/AddLitigationCorrespondence",
      getCorrespondencesById: "/api/LitigationRequestCorrespondence/GetLitigationCorrespondences",
      addCorrespondenceReply: "/api/LitigationRequestCorrespondence/AddLitigationCorrespondenceReply",
      getCorrespondenceReply: "/api/LitigationRequestCorrespondence/GetLitigationCorrespondenceReply",
      getCorrespondenceReplyByRequestId: "/api/LitigationRequestCorrespondence/GetLitigationCorrespondencesByLitigationRequestId",
      getLitigationRequestArbitrationCorrespondence: "/api/LitigationRequestCorrespondence/GetLitigationRequestArbitrationCorrespondence",
      getLitigationRequestReconciliationCorrespondence: "/api/LitigationRequestCorrespondence/GetLitigationRequestReconciliationCorrespondence",
      getLitigationModificationRequests: "/api/LitigationRequestContract/GetModificationRequestForEmployee",
      AddModificationRequestAction: "/api/LitigationRequestContract/AddModificationRequestAction",
    },
    Notification: {
      GetNotificationListForBackOffice: "/api/Notification/GetNotificationListForBackOffice",
      GetNotificationListForBackOfficePaged: "/api/Notification/GetNotificationListForBackOfficePaged",
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

      GetLitigationAcceptanceOrRejectDocumentData: "/api/LitigationRequest/GetLitigationArbitrationTaskAcceptanceOrRejectDocumentData",
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
      AssignReviewer: '/api/LitigationRequest/Assign',
    },
    LitigationRequest: {
      AuditngList: '/api/LitigationRequest/AuditngList',
      AuditngListArbitration: '/api/LitigationRequest/AuditngListArbitration',
      AuditngListReconciliation: '/api/LitigationRequest/AuditngListReconciliation',
      GetLitigationById: '/api/LitigationRequest/GetLitigationByIdForEmployee',
      GetAuditNotesById: "/api/LitigationRequest/GetAuditNotesById",
      ApproveArbitrationFeesPaid: '/api/LitigationRequest/ApproveArbitrationFeesPaid',
      GetLitigationRequestForFullAllReviewer: '/api/LitigationRequest/GetLitigationRequestForFullAllReviewer',
      GetReviewersLookup: "/api/LitigationRequest/GetReviewersLookup",

    },
    WorkFlowProcessingLog: {
      GetAuditNotesById: "/api/WorkFlowProcessingLog/GetAuditNotesById",
    },
    BpfService: {
      ProcessWorkFlow: "/api/BpfService/ProcessWorkFlow",
      GetWorkflowStepEventsForEmployee: "/api/BpfService/GetWorkflowStepEventsForEmployee/requestId",
      GetRequestLogForEmployee: "/api/BpfService/GetRequestLogForEmployee/requestId"
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
      GetArbitratorClassOptions: '/api/SysArbitratorClass/Get',
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
      GetReformersLookupForFilter: "/api/Citizen/GetReformersLookupForFilter",
      GetArbitratorsFullLookup: "/api/Citizen/GetArbitratorsFullLookup",
      GetArbitratorsLookup: "/api/Citizen/GetArbitratorsLookup",
      GetArbitratorsLookupForFilter: "/api/Citizen/GetArbitratorsLookupForFilter",
    },
    Reports: {
      GetLitigationStatisticsMainReportResult: "/api/Reports/GetLitigationStatisticsReviewReport",
      GetLitigationStatisticsReformerReport: "/api/Reports/GetLitigationStatisticsReformerReport",
      GetLitigationStatisticsArbitrationReport: "/api/Reports/GetLitigationStatisticsArbitrationReport",
    },
    SysSetting: {
      GetSettingByKey: "/api/SysSetting/GetSettingByKey",
      ToggleAutoDistributionOnAndOff: "/api/SysDepartment/ToggleAutoDistributionOnAndOff",
      GetDistributionModeByDepartmentType: "/api/SysDepartment/GetDistributionModeByDepartmentType",
    },
    SysCity: {
      Get: "/api/SysCity/Get"
    },
    SysArea: {
      Get: "/api/SysArea/Get"
    },
    SysCategories: {
      GetLitigationRequestCategories: "/api/SysLitigationRequestCategory/Get"
    },
    SysStatuses: {
      GetLitigationRequestStatus: "/api/SysLitigationRequestStatus/Get"
    },
    profile: {
      ProcessVacationRequest: "/api/SysVacationRequest/ProcessVacationRequestAsync",
      createVacationRequest: "/api/SysVacationRequest/CreateVacationAsync",
      getVacationRequestsForEmployee: "/api/SysVacationRequest/EmployeeList",
      getVacationRequestsForAdmin: "/api/SysVacationRequest/AdminList",
      
      changePassword:"/api/Account/ChangePassword"
    },
    usersManagement:{
      CreateEmployee:"/api/SysEmployee/CreateEmployee",
      getAllEmployee:"/api/SysEmployee/List",
      getAllEmployeeLookup:"/api/SysEmployee/Get",
      getAllEmployeeByDepartmentTypeLookup:"/api/SysEmployee/GetEmployeeByDepartmentType",
      getAllDepartmentsLookup:"/api/SysDepartment/Get",
      UpdateEmployeeStatus:"/api/SysEmployee/UpdateEmployeeStatus",
      updateEmployee:"/api/SysEmployee/UpdateEmployee",
      getEmployeeById:"/api/SysEmployee/GetByIdAsync"
    },
    adminstrativeFees:{
      getAllFees:"/api/SysLitigationRequestAmount/Get",
      updateFees:"/api/SysLitigationRequestAmount/UpdateAsync",
      GetFeesById:"/api/SysLitigationRequestAmount/GetByIdAsync",
      createFees:"/api/SysLitigationRequestAmount/Create",
      deleteFees:"/api/SysLitigationRequestAmount/Delete",
    },
    reconciliationFees:{
      getFees:"/api/SysSetting/GetReconciliationFeesSettings",
      updateFees:"/api/SysSetting/UpdateRange",
    },
    reconciliationSettings:{
      getsetting:"/api/SysSetting/GetReconciliationSetting",
      updateFees:"/api/SysSetting/UpdateRange",
    },
    termsSettings:{
      getTerms:"/api/SysLitigationRequestContractType/GetAll",
      updateTerms:"/api/SysLitigationRequestContractType/UpdateRange",
    },
    arbitirationFees:{
      getFees:"/api/SysSetting/GetArbitrationFeesSettings",
      getsetting:"/api/SysSetting/GetArbitrationSettings",
      updateFees:"/api/SysSetting/UpdateRange",
    },
    reviewSettings:{
      getsetting:"/api/SysSetting/GetReviewSetting",
      updatesetting:"/api/SysSetting/UpdateRange",
    },
    dashbourd:{
      getStatistics:"/api/Reports/GetLitigationStatisticsForAllStages",
      DetailsForAllStages:"/api/Reports/GetLitigationStatisticsDetailsForAllStages",
      GetListOfLitigationReviewReport:"/api/Reports/GetListOfLitigationReviewReport",
      GetListOfLitigationReformerReport:"/api/Reports/GetListOfLitigationReformerReport",
      GetListOfLitigationArbitrationReport:"/api/Reports/GetListOfLitigationArbitrationReport",
      GetListOfLitigationForAdminReport:"/api/Reports/GetListOfLitigationForAdminReport",
      GetLitigationStatisticsReviewReports:"/api/Reports/GetLitigationStatisticsReviewReport",
      GetLitigationStatisticsReformerReports:"/api/Reports/GetLitigationStatisticsReconciliationReport",
      GetLitigationStatisticsArbitrationReports:"/api/Reports/GetLitigationStatisticsArbitrationsReport",
      GetLitigationStatisticsForAdminReport:"/api/Reports/GetLitigationStatisticsForAdminReport",
      GetReviewersReport:"/api/Reports/GetReviewersReport",
      GetReformersReport:"/api/Reports/GetReformersReport",
      GetArbitratorsReport:"/api/Reports/GetArbitratorsReport",
      GetReviewDashbourdReport:"/api/Reports/GetReviewDashbourdReport",
      GetReconciliationDashbourdReport:"/api/Reports/GetReconciliationDashbourdReport",
      GetArbitrationDashbourdReport:"/api/Reports/GetArbitrationDashbourdReport",
      GetAllPersonasReport:"/api/Reports/GetReviewrsReformersArbitratorsReport",

    },
  },
  modules: {
    auth: 'auth',
    lawsuits: 'Lawsuits',
    citizenRequests: 'citizen-requests',
    arbitration: "arbitration",
    reports: "reports",
    profile: 'profile',
    UsersManagement: 'users-management'
  },
  pages: {
    auth: {
      login: "login",
    },
    arbitration: {
      arbitratorCountList: "arbitrator-count-list",
      arbitratorCountDetails: "arbitrator-count-details",
      arbitrationRequestCorrespondencesList: "arbitration-request-correspondences-list",
      arbitrationRequestCorrespondencesDetails: "arbitration-request-correspondences-details",
      assignedArbitrationRequests: 'assigned-arbitration-requests',
      arbitratorSessionList: "arbitrator-session-list",
      assignarbitratorlist: 'assign-arbitrator-list',
      arbitratorRecusalRequests: 'arbitrator-recusal-requests',
      approveOrRejectArbitrattionRecusalRequest: 'approve-or-reject-arbitrator-recusal-request',
      assignedArbitrationRequestsDocumnets: 'assigned-arbitration-request-documents',
      approveArbitrationFeesPaidList:'approve-arbitration-fees-paid-list',
      approveArbitrationFeesPaidDetails:'approve-arbitration-fees-paid-details',
      
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
    litigation: {
      litigationRequestCorrespondencesList: "litigation-request-correspondences-list",
      litigationRequestCorrespondencesDetails: "litigation-request-correspondences-details",
      litigationRequestNotesList: "litigation-request-notes-list",
      litigationRequestNotesDetails: "litigation-request-notes-details",
      litigationModificationRequests: "litigation-modification-requests",
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
      reviewerList: 'reviewer-list',
      requestToExtendArbitrationPeriodList: 'request-extend-arbitration-period-list',
      requestToExtendArbitrationPeriodDetails: 'request-extend-arbitration-period-details',
      litigationRequestForArbitratorSelectionDurationList: 'arbitrator-selection-duration-List',
      litigationRequestForArbitratorSelectionDurationDetails: 'arbitrator-selection-duration-details',
      assignArbitrationHeadList: 'assign-arbitration-head-list',
      assignArbitrationHeadDetails: 'assign-arbitration-head-details',
      assignArbitrationMemberList: 'assign-arbitration-member-list',
      assignArbitrationMemberDetails: 'assign-arbitration-member-details',

    },
    reports: {
      statisticsReview: 'statistics-review',
      statisticsReformer: 'statistics-reformer',
      statisticsArbitration: 'statistics-arbitration',
      listReviewReport: 'list-review-report',
      listReformerReport: 'list-reformer-report',
      listArbitratorReport: 'list-arbitrator-report',
      statisticsReviewReport: 'statistics-review-report',
      StatiscsReformerReport: 'statistics-reformer-report',
      StatiscsArbitirationReport: 'statistics-arbitration-report',
      ReviewersReport: 'reviewers-report',
      ReformersReport: 'reformers-report',
      ArbitratorsReport: 'arbitrators-report',
      ReviewDashbourd: 'review-dashbourd',
      ReformerDashbourd: 'reformer-dashbourd',
      ArbitratorDashbourd: 'arbitrator-dashbourd',

    },
    profile: {
      vacationRequest: 'vacation-request',
      changePassword: 'change-password',
      vacationRequestReply: 'vacation-request-reply'
    },
    usersManagement: {
      userList: 'user-list',
      createUser: 'create-user',
      updateUser: 'update-user/:id',
      admistrativeFees:'admistrative-fees',
      createAdmistrativeFees:'create-admistrative-fees',
      updateAdmistrativeFees:'update-admistrative-fees/:id',
      reconciliationFees:'reconciliation-fees',
      arbitirationFees:'arbitiration-fees',
      arbitirationsettings:'arbitiration-settings',
      reconciliationSettings:'reconciliation-settings',
      reviewSettings:'review-settings',
      TermsSettings:'terms-settings',
      HomePage:'home',
      Dashbourd:'dashbourd',
      DashbourdTypes:'dashbourd-litigationtypes',

      ListOfLitigationForAdminReport:'list-admin-report',
      AllStagesStatisiticsForAdminReport:'all-stages-statistics',
      AllPersonasForAdminReport:'all-personas-report',
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
    noArabicLetters: "^[a-zA-Z0-9$@$!%*?&#^-_. +]+$",
    identityNumber:"^[0-9]{10}$"
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
