export interface LawsuitReiewRequestDto {
  // id: string;
  // createdOn: Date;
  // employeeId: string;
  // requestId: string;
  // workFlowStepEventId: string;
  // showForApplicant: true;
  // sourceWorkFlowProcessingLogId: string;
  // workFlowStepId: string;
  // isWithNotes: true;
  // notes: string;
  // isFinished: true;
  // finishedOn: Date;
  // workFlowProcessingLogFiles: workFlowProcessingLogFile[]
  requestId: string;
  // employeeId: string;
  processingLogId: string;
  workflowStepEventId: string;
  notes: string;
  uploadedFilesIds:string[]
}
