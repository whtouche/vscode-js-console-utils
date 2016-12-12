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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "console-log-utils" is now active!');

    const consoleLogVariable = vscode.commands.registerCommand('extension.insertLogStatement', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const selection = editor.selection;
        console.log('editor.selection: ', editor.selection);
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

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        vscode.commands.executeCommand('editor.action.selectHighlights')
            .then(() => {
                vscode.commands.executeCommand('expandLineSelection')
                .then(() => {
                    vscode.commands.executeCommand('editor.action.deleteLines')
                    .then(() => {
                        console.log('did this work?');
                    })
                })
            })
    });
    context.subscriptions.push(deleteAllConsoleLogs);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;
