import { Component, ElementRef, EventEmitter, Inject, inject, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs';
import { environment } from '@environment/environment';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationReconciliationTaskAcceptOrRejectDocumentDto } from '../../models/LitigationReconciliationTaskAcceptOrRejectDocumentDto';
import { ArbitrationDocumentService } from '@app/modules/features/arbitration/services/arbitrator-document/arbitrator-document.service';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-assigned-reconciliation-requests-documents',
  templateUrl: './assigned-reconciliation-requests-documents.component.html',
  styleUrl: './assigned-reconciliation-requests-documents.component.scss'
})
export class AssignedReconciliationRequestsDocumentsComponent  extends BaseComponent implements OnInit{
  private _activatedRoute = inject(ActivatedRoute);
  litigationDocument: LitigationReconciliationTaskAcceptOrRejectDocumentDto | undefined;
  @Input() litigationData: any;
  documentId: number | undefined;
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  baseUrl = `${environment.baseURL}/`;
  @Input() download: string = ''; 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['download']) {
      this.downloadPDF()
    }
  }

  documentCompination = [
    {
      documentId: 1,
      response: 1, // Accept or Reject
      requestTypeId: [79] // Type
    },
    {
      documentId: 2,
      response: 2,
      requestTypeId: [79]
    },
    {
      documentId: 3,
      response: 1,
      requestTypeId: [82, 87, 66,78]
    },
    {
      documentId: 4,
      response: 2,
      requestTypeId: [82, 87, 66,78]
    },
  ]

  constructor(
    private _documentService: ArbitrationDocumentService) {
    super();

  }

  ngOnInit(): void {
    console.log('Litigation Data:', this.litigationData);
    this.GetLitigationAcceptanceOrRejectDocumentData(this.litigationData.litigationId, this.litigationData.requestId)

  }

  private observeActivatedRoute(): void {
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
      this.GetLitigationAcceptanceOrRejectDocumentData(res['id'], res['requestId']);
    })
  }

  GetLitigationAcceptanceOrRejectDocumentData(litigationId: string, requestId: string) {
    this._documentService.GetLitigationReconciliationTaskAcceptanceOrRejectDocumentData(litigationId, requestId)
      .subscribe((res:any) => {
        
        if (res.isDone) {
          this.litigationDocument = res.data

          if(res.data?.response === 0){
            this.selectDocumentId(this.litigationData.response)
          }else{

            this.selectDocumentId(res.data?.response as number);
          }

        } else {

        }
      })
  }


  selectDocumentId(response: number) {
    
    this.documentId = this.documentCompination.find(item => item.response === response
      && item.requestTypeId.includes(this.litigationDocument!.requestTypeId))?.documentId;
  }

  // downloadPDF() {
  //   
  //   // const elementtest = this.pdfContent;
  //   const element = this.pdfContent?.nativeElement;
  //       var clonedElement = element?.cloneNode(true);
  //       clonedElement?.style.setProperty("display","block")
  //   //  // Add an image dynamically
  //   //  const img = document.createElement('img');
  //   //  img.src = "data:image/jpeg;base64,"+ this.litigationDocument?.signtureFile;
  //   //  img.style.width = "100%"; // Adjust size as needed
  //   //  img.style.marginBottom = "20px"; // Optional styling
  //   //  clonedElement.append(img); // Add the image at the top of the cloned element

  //           const options = {
  //             margin: 1,
  //             filename: 'document.pdf',
  //             image: { type: 'jpeg', quality: 0.98 },
  //             html2canvas: { scale: 2 },
  //             jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  //           };
        
  //           // Generate PDF
  //           html2pdf()
  //             .from(clonedElement)
  //             .set(options)
  //             .save();
    
  //             // remove cloned element
  //           clonedElement?.remove();
  //         }

          downloadPDF() {
            const element = this.pdfContent?.nativeElement;
            var clonedElement = element.cloneNode(true);
            clonedElement.style.setProperty("display","block");
            var fileName="طلب الصلح الخاص برقم دعوه "+ this.litigationDocument?.litigationNumber;
            const options = {
              margin: [10, 10, 10, 10], // margins: [top, right, bottom, left]
              filename: fileName,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { 
                scale: 2, // higher resolution
                useCORS: true,
                allowTaint: true
              },
              jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
              },
              pagebreak: {
                mode: 'css', // use CSS for page breaks
                before: '.page-break-before', // new page before elements with this class
                after: '.page-break-after', // new page after elements with this class
                avoid: '.avoid-break' // avoid breaking elements with this class
              }
            };
            // Generate PDF
            html2pdf()
              .from(clonedElement)
              .set(options)
              .save();
          }
        
}
