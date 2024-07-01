import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { fileUploader } from '@app/core/interceptors/headers-handler/headers-handler.interceptor';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable, map } from 'rxjs';

@Injectable()
export class FileUploaderService {
  private _httpClient = inject(HttpClient)

  constructor() { }
  upload(files: any) {
    let myFormData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i)
      myFormData.append('Files', file, file.name);
    }
    return this._httpClient.post(Configuration.APIs.SysFileManager.Upload, myFormData,
      {
        context: new HttpContext().set(fileUploader, true ),
        observe: 'events',
      }

    ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  DeleteFile(id : string): Observable<BaseResponse<any>>{
    return this._httpClient.delete<BaseResponse<any>>(`${Configuration.APIs.SysFileManager.Remove}/${id}`)
 }
}
