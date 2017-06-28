import tl = require('vsts-task-lib/task');
import path = require('path');
import fs = require('fs');
import Q = require('q');
import AWS = require('aws-sdk/clients/s3');
import TaskParameters = require('./helpers/taskParameters');
import TaskOperationHelpers = require('./helpers/taskOperations');

tl.setResourcePath(path.join(__dirname, 'task.json'));

function run(): Promise<void> {
    const taskParameters = new TaskParameters.UploadTaskParameters();
    return TaskOperationHelpers.TaskOperations.uploadArtifacts(taskParameters);
}

// run
run().then((result) =>
    tl.setResult(tl.TaskResult.Succeeded, tl.loc('TaskCompleted'))
).catch((error) =>
    tl.setResult(tl.TaskResult.Failed, error)
    );
