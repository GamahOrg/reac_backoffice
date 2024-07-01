import { HttpHeaders, HttpParams } from "@angular/common/http";

export class FileUploader {
    id: string = "";
    httpUrl: string = "";
    httpRequestHeaders: HttpHeaders = new HttpHeaders;
    httpRequestParams: HttpParams = new HttpParams;
    multiple: boolean = false;
    uploadAllColor?: string = 'primary';
    buttonText?: string = "اختر ملف";
    attachmentsAreaText?: string = "فقط قم بسحب الملفات وإفلاتها هنا";
    removeAllLabel?: string = "مسح الكل";
    uploadAllLabel?: string = "رفع الكل";
    size: number = 5120;
    allowedExtensionsText: string = 'pdf, doc, docx, .xls, .xlsx, jpg, jpeg أو png';
    /** Allowed files extensions in lower case */
    allowedExtensions?: string[] = ['.pdf', '.doc', '.docx','.xls','.xlsx', '.jpg','.jpeg','.png'];
}
