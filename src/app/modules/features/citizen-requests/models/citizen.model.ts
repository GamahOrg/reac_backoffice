export interface CitizenReformer  {
    id: string;
    fullName: string;
    requestsCount: number;
}

export interface AssignRequestPayload {
    requestId: string;
    reformerId: string;
}