({
    doInit: function(component, event, helper) {
        try{
            var action = component.get('c.getFileRecord');
            action.setCallback(this, function (response) {
                try {
                    var state = response.getState();
                    if (component.isValid() && state === 'SUCCESS') {
                        var files = response.getReturnValue();
                        console.log(files);
                        if (files && files[0]) {
                            component.set('v.fileRecord', files[0]);
                            component.set('v.recordId', files[0].Id);
                            if (files[0].ContentDocumentLinks[0]) {
                                component.set('v.fileId', files[0].ContentDocumentLinks[0].ContentDocumentId);
                            }
                        }
                    } else {
                        var errorMsg = response.getError()[0].message;
                        console.log(errorMsg);
                    }
                } catch (e) {
                    console.log(e);
                }
            });
            $A.enqueueAction(action);
        } catch(e) {
            console.log(e);
        }
    },
    handleUploadFinished: function (component, event, helper) {
        // This will contain the List of File uploaded data and status
        var uploadedFiles = event.getParam("files");

        console.log(uploadedFiles);

        var action = component.get('c.saveFile');

        var recordId = component.get('v.recordId');

        action.setParams({
            'documentId': uploadedFiles[0].documentId,
            'recordId': recordId
        });

        action.setCallback(this, function (response) {
            try {
                var state = response.getState();
                if (component.isValid() && state === 'SUCCESS') {
                    var file = response.getReturnValue();
                    console.log(file);
                    component.set('v.fileRecord', file);
                    component.set('v.fileId', uploadedFiles[0].documentId);
                } else {
                    var errorMsg = response.getError()[0].message;
                    console.log(errorMsg);
                }
            } catch (e) {
                console.log(e);
            }
        });
        $A.enqueueAction(action);
    },
    enableUpload: function (component, event, helper) {
        var action = component.get('c.createFileRecord');
        action.setCallback(this, function (response) {
            try {
                var state = response.getState();
                if (component.isValid() && state === 'SUCCESS') {
                    var file = response.getReturnValue();
                    console.log(file);
                    component.set('v.fileRecord', file);
                    component.set('v.recordId', file.Id);
                    if (file != undefined && file != null && file.Id != null && file.Id != null) {
                        component.set('v.showFileUpload', true);
                    }
                } else {
                    var errorMsg = response.getError()[0].message;
                    console.log(errorMsg);
                }
            } catch (e) {
                console.log(e);
            }
        });
        $A.enqueueAction(action);
    }
})
