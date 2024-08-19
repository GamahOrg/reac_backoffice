import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base/base.component';
import { FileUploader } from '@app/shared/models/file-uploader.model';
import { FileUploaderService } from '@app/shared/services/file-uploader/file-uploader.service';
import { takeUntil } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent extends BaseComponent implements OnInit, AfterViewInit {
    private _uploadService = inject(FileUploaderService);
    private _translateService = inject(TranslateService);

    @Input() data: FileUploader = new FileUploader;
    @Output() fileRemoved = new EventEmitter<any>();
    @Output() fileUploaded = new EventEmitter<any>();
    selectedFiles?: FileList
    currentFile?: File | FileList;
    progress = 0;
    message = '';
    extensionErrorMessage = '';
    // fileInfos?: Observable<any>;
    selectedFilesName: string[] = []

    ngOnInit(): void {
        if (!this.data.size)
            this.data.size = 5120;
        if (!this.data.allowedExtensionsText)
            this.data.allowedExtensionsText = 'pdf, doc, docx, .xls, .xlsx, jpg, jpeg أو png';
        if (!this.data.allowedExtensions || this.data.allowedExtensions.length == 0)
            this.data.allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png']
    }
    ngAfterViewInit(): void {
        console.log("this.data", this.data)
    }
    public selectFiles(event: any): void {
        this.selectedFiles = event.target.files;
        this.updateSelectedFileNames(event)
    }
    private updateSelectedFileNames(event: any): void {
        this.selectedFilesName = [];
        for (let i = 0; i < event.target.files.length; i++) {
            let file = event.target.files.item(i)
            this.selectedFilesName.push(file.name)
        }
    }


    public upload(): void {
        this.progress = 0;
        this.validateUploadedFiles()

    }
    private validateUploadedFiles(): void {
        if (this.selectedFiles) {
            const files: FileList | File = this.selectedFiles;
            if (files) {
                if (files.length) {
                    for (let index = 0; index < files.length; index++) {
                        const element = files.item(index) as File;
                        if ((element?.size as number) / 1024 > this.data.size) {
                            this.message = this._translateService.instant(this.translations.general.fileNameError) + element?.name + this._translateService.instant(this.translations.general.fileSizeError);
                            return;
                        }
                        if (!this.data.allowedExtensions?.includes(element.name.slice(element.name.lastIndexOf(".")).toLowerCase())) {
                            this.extensionErrorMessage = `${this._translateService.instant(this.translations.general.invalidFormat)} ${this.data.allowedExtensions?.join(' ,')} ${this._translateService.instant(this.translations.general.allowedFormats)}`;
                            return;
                        }
                    }
                }


                this.currentFile = files;
                this.uploadFile()
            }

            this.selectedFiles = undefined;
        }
    }

    private uploadFile(): void {
        this._uploadService.upload(this.currentFile).pipe(takeUntil(this.destroy$)).subscribe({
            next: (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress = Math.round((100 * event.loaded) / event.total);
                } else if (event instanceof HttpResponse) {
                    this.message = event.body.message;
                    this.onUpload("", event.body)
                    console.log(event.body);
                }
            },
            error: (err: any) => {
                console.log(err);
                this.progress = 0;
                if (err.error && err.error.message) {
                    this.message = err.error.message;
                } else {
                    this.message = this._translateService.instant(this.translations.general.fileUploadError)
                }

                this.currentFile = undefined;
            },
        });
    }
    public deleteAll(): void {
        this.selectedFiles = undefined;
        this.currentFile = undefined;
        this.selectedFilesName = []
    }

    // helper method 

    onUpload(controlName: string, e: any): void {
        // console.log("onUpload", controlName);
        // console.log("onUpload", e);
        this.fileUploaded.emit({ id: controlName, eventRes: e })
    }
}
