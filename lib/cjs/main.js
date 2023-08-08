#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
// add the pre hooks in core.hooksPath in git config file
(0, child_process_1.exec)("git config core.hooksPath ./node_modules/@rysun/security-gate/.security-gate");
const type = os_1.default.type();
if (type !== "Windows_NT") {
    (0, child_process_1.exec)("chmod ug+x ./node_modules/@rysun/security-gate/.security-gate/*");
}
// template for pre hooks
const template = `#!/usr/bin/env sh

export NVM_DIR="$HOME/.nvm/nvm.sh"
. "$(dirname $NVM_DIR)/nvm.sh"

export NVM_DIR="$HOME/.nvm"
a=$(nvm ls | grep 'node')
b=$\{a#*(-> }
v=$\{b%%[)| ]*}

export PATH="$NVM_DIR/versions/node/$v/bin:$PATH"

node ./node_modules/@rysun/security-gate/lib/esm/index.js`;
// write that template in pre-commit and pre-push shell files in the OS type is 'Linux'
if (type === "Linux") {
    fs_1.default.writeFileSync(`./node_modules/@rysun/security-gate/.security-gate/pre-commit`, template);
    fs_1.default.writeFileSync(`./node_modules/@rysun/security-gate/.security-gate/pre-push`, template);
}
//# sourceMappingURL=main.js.map