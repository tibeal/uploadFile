public class FileUploaderController {
    @AuraEnabled
    public static Object saveFile(Id documentId, Id recordId, Id memberId) {
        Fielo_FileUpload__c updFile = new Fielo_FileUpload__c(
            Id = recordId,
            Status__c = 'Submitted'
        );
        update updFile;

        List<Fielo_FileUpload__c> fileRecords = (List<Fielo_FileUpload__c>) Database.query('SELECT Id, Name, Status__c, (SELECT Id, ContentDocumentId FROM ContentDocumentLinks) FROM Fielo_FileUpload__c WHERE Id = :recordId');

        updFile = fileRecords[0];

        return updFile;
    }

    @AuraEnabled
    public static Object getFileRecord() {
        Id userId = UserInfo.getUserId();

        List<Fielo_FileUpload__c> fileRecords = (List<Fielo_FileUpload__c>) Database.query('SELECT Id, Name, Status__c, (SELECT Id, ContentDocumentId FROM ContentDocumentLinks) FROM Fielo_FileUpload__c WHERE CreatedById = :userId and Status__c IN (\'Draft\',\'Submitted\') ORDER BY Name DESC');

        return (Object) fileRecords;
    }

    @AuraEnabled
    public static Object createFileRecord() {
        Fielo_FileUpload__c newFile = new Fielo_FileUpload__c( Status__c = 'Draft');
        insert newFile;
        return newFile;
    }
    
}
