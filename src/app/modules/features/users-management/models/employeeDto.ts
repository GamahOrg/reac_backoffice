export interface EmployeeDto {
    id: string;
    employeeName : string ;
    departmentName : string;
    mobile : string;
    isActive : boolean;
    }

    export interface CreateEmployeeDto {
        id: string;
        name : string;
        identityNumber:string;
        departmentId : string;
        JobTitle:string;
        mobile : string;
        email:string;
        isActive : boolean;
        roleId:string;
        }

        export interface targetEmployeeDto {
            employeeName : string;
            identityNumber:string;
            departmentId : string;
            jobName:string;
            mobile : string;
            email:string;
            isAdmin : boolean;
            isActive:boolean;
            }
            export interface EmployeeStatusUpdate {
                employeeId: string;
                isActive: boolean;
              }