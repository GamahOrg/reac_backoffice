export interface CitizenReformer  {
    id: string;
    fullName: string;
    requestsCount: number;
}

export interface AssignRequestPayload {
    requestId: string;
    reformerId: string;
}

export interface CitizenFullLookupArbirator {
    id: string;
    fullName: string;
    requestsCount: number;
    areaName: string | null;
    experienceYears: number | null;
    arbitratorClass: string | null;
    brief: string | null;
}