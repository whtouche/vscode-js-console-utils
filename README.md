## vscode-js-console-utils

Easily insert and remove console.log statements.

## Installing

This extension is available for free in the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=whtouche.vscode-js-console-utils)

## Usage

With selection:
* Highlight a variable (or really any text)
* Press Cmd+Shift+L
* The output (on a new line) will be: console.log('variable: ', variable);

Without selection:
* Press Cmd+Shift+L
* The output (on the same line) will be: console.log();

To remove console.logs:
* Press Cmd+Shift+D
* This will delete all console.log statements in the current document


## License
[MIT License](LICENSE.md)