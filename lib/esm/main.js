#!/usr/bin/env node
import { exec } from "child_process";
import os from "os";
import fs from "fs";
// add the pre hooks in core.hooksPath in git config file
exec("git config core.hooksPath ./node_modules/@rysun/security-gate/.security-gate");
const type = os.type();
if (type !== "Windows_NT") {
    exec("chmod ug+x ./node_modules/@rysun/security-gate/.security-gate/*");
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
    fs.writeFileSync(`./node_modules/@rysun/security-gate/.security-gate/pre-commit`, template);
    fs.writeFileSync(`./node_modules/@rysun/security-gate/.security-gate/pre-push`, template);
}
//# sourceMappingURL=main.js.map