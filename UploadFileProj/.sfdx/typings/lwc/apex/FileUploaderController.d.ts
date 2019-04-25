declare module "@salesforce/apex/FileUploaderController.saveFile" {
  export default function saveFile(param: {documentId: any, recordId: any, memberId: any}): Promise<any>;
}
declare module "@salesforce/apex/FileUploaderController.getFileRecord" {
  export default function getFileRecord(): Promise<any>;
}
declare module "@salesforce/apex/FileUploaderController.createFileRecord" {
  export default function createFileRecord(): Promise<any>;
}
