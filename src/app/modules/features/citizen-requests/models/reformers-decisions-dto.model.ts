export interface ReformersDecisionsDto {
    identityNumber: string,
    fullName: string,
    mobile: string,
    email: string
    requestsCount: number,
    reformerStatus: string,
    reformerStatusDate: null | Date,
    id: string

    experienceYears? : number | null,
    arbitratorClass? : string | null,
    arbitratorStatus? : string | null,
    arbitratorStatusDate? : Date | null,
}


