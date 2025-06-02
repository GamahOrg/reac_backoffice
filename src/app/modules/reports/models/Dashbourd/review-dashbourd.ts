export interface LitigationStatisticsDashbourd {
    totalLitigationCount: number;
    notFinishedCount: number;
    finishedCount: number;
    dueDateReconciliationCount: number;
    dueDateArbitrationCount: number;
    
    // Real Estate Brokerage
    realEstateBrokerageCount: number;
    realEstateBrokerageFinishedCount: number;
    realEstateBrokerageNotFinishedCount: number;
    realEstateBrokerageDueDateCount: number;
    
    // Wafi
    wafiCount: number;
    wafiFinishedCount: number;
    wafiNotFinishedCount: number;
    wafiDueDateCount: number;
    
    // Other Services
    otherServicesCount: number;
    otherServicesFinishedCount: number;
    otherServicesNotFinishedCount: number;
    otherServicesDueDateCount: number;
    
    // Rent
    rentCount: number;
    rentFinishedCount: number;
    rentNotFinishedCount: number;
    rentDueDateCount: number;
    
    // Properties
    propertiesCount: number;
    propertiesFinishedCount: number;
    propertiesNotFinishedCount: number;
    propertiesDueDateCount: number;
    
    // Ratios
    notFinishedRatio: number;
    finishedRatio: number;
    realEstateBrokerageFinishedRatio: number;
    realEstateBrokerageNotFinishedRatio: number;
    realEstateBrokerageDueDateRatio: number;
    wafiFinishedRatio: number;
    wafiNotFinishedRatio: number;
    wafiDueDateRatio: number;
    otherServicesFinishedRatio: number;
    otherServicesNotFinishedRatio: number;
    otherServicesDueDateRatio: number;
    rentFinishedRatio: number;
    rentNotFinishedRatio: number;
    rentDueDateRatio: number;
    propertiesFinishedRatio: number;
    propertiesNotFinishedRatio: number;
    propertiesDueDateRatio: number;

    TotalReviewDueDateCount: number;
    TotalReviewDueDateRatio: number;
  }