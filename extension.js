const vscode = require('vscode');

const insertText = (val) => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('Can\'t insert log because no document is open');
        return;
    }

    const selection = editor.selection;

    const range = new vscode.Range(selection.start, selection.end);

    editor.edit((editBuilder) => {
        editBuilder.replace(range, val);
    });
}

function deleteAllLogStatements(workspaceEdit, docUri, logs) {
    logs.forEach((log) => {
        workspaceEdit.delete(docUri, log);
    });
    vscode.workspace.applyEdit(workspaceEdit).then(() => {
        console.log('edited!');
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "console-log-utils" is now active!');

    const consoleLogVariable = vscode.commands.registerCommand('extension.insertLogStatement', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        vscode.commands.executeCommand('editor.action.insertLineAfter')
            .then(() => {
                const logToInsert = `console.log('${text}: ', ${text});`;
                insertText(logToInsert);
            })
    });
    context.subscriptions.push(consoleLogVariable);

    const deleteAllConsoleLogs = vscode.commands.registerCommand('extension.deleteAllConsoleLogs', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        let logStatements = [];
        let match;
        const document = editor.document;
        const documentText = editor.document.getText();
        const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\((.*)\);?/g;

        while (match = logRegex.exec(documentText)) {
            let matchRange =
                new vscode.Range(
                    document.positionAt(match.index),
                    document.positionAt(match.index + match[0].length)
                );

            console.log('match.index', match.index);
            console.log('match[0].length', match[0].length);

            if (!matchRange.isEmpty)
            logStatements.push(matchRange);
        }


        let workspaceEdit = new vscode.WorkspaceEdit();

        deleteAllLogStatements(workspaceEdit, document.uri, logStatements);

        // const logRegex = new RegExp("console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\((.*)\);?");

        // vscode.commands.executeCommand('editor.action.selectHighlights')
        //     .then(() => {
        //         vscode.commands.executeCommand('expandLineSelection')
        //             .then(() => {
        //                 vscode.commands.executeCommand('editor.action.deleteLines')
        //                     .then(() => {
        //                         console.log('did this work?');
        //                     })
        //             })
        //     })
    });
    context.subscriptions.push(deleteAllConsoleLogs);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;
