export const Configuration = {
  languages: ['ar', 'en'],
  defaultLang: 'ar',
  APIs: {
    Account: {
      login: '/api/Account/Login',
      refreshToken:'/api/Account/RefreshToken',
    },
    SysFileManager: {
      Upload: '/api/SysFileManager/Upload',
      Remove: '/api/SysFileManager/Remove',
      RemoveRange: '/api/SysFileManager/RemoveRange',
    },
    LitigationRequest: {
      AuditngList: '/api/LitigationRequest/AuditngList',
      GetLitigationById: '/api/LitigationRequest/GetLitigationById'
    },
    BpfService:{
      ProcessWorkFlow:"/api/BpfService/ProcessWorkFlow",
      // GetWorkflowStepEventsForEmployee:"/api/BpfService/GetWorkflowStepEventsForEmployee"
      GetWorkflowStepEventsForEmployee:"/api/BpfService/GetWorkflowStepEventsForEmployee/requestId/employeeId"
    }
  },
  modules: {
    auth: 'auth',
    lawsuits: 'Lawsuits'
  },
  pages: {
    lawsuits:{
      lawsuitList: "lawsuit-list",
      lawsuitTypes: "lawsuit-types",
      createLawsuit: "create-lawsuit",
      editLawsuit: "edit-lawsuit",
      lawsuitDetails: "lawsuit-details",
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
