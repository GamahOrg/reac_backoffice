import { HttpParams } from "@angular/common/http";

export function createQuery(body: {[key: string]: any}) {
    let queryParams = new HttpParams();

    Object.keys(body).forEach((item) => {
        if (body[item]) {
            queryParams = queryParams.append(item, body[item])
        }
    })

    return queryParams;
}