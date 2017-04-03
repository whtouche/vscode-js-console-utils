## vscode-js-console-utils

Easily insert and remove console.log statements, by [@whtouche](https://twitter.com/whtouche)

![](https://i.imgur.com/0tiesd2.gif)

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

## Keybindings

Default keybindings for all platforms:

|              Command              |     Mac     |   Windows   |    Linux     |   Default    |
| :-------------------------------: | :---------: | :---------: | :----------: | :----------: |
| Insert console.log | shift+cmd+l | shift+win+l | shift+meta+l | shift+ctrl+l |
| Delete all console.log | shift+cmd+d | shift+win+d | shift+meta+d | shift+ctrl+d |

Above shortcuts can be easily customised via the `keybindings.json` file.

| Command                           | Command ID                       |
| :-------------------------------- | -------------------------------- |
| Insert console.log             | extension.insertLogStatement     |
| Delete all console.log | extension.deleteAllLogStatements |

More details about customising shortcuts can be found in [VS Code documentation](http://code.visualstudio.com/docs/getstarted/keybindings#_customizing-shortcut)

## To Do
* Add support for other console.* methods (warn, error, time, timeEnd, etc)
* Add ability to delete console.* across project (currently just the open file)
* ~~When deleting console.*, report how many were deleted~~, across how many files
* Allow configuration to only delete certain types of console.* statements

## License
[MIT License](LICENSE)