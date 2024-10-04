#!/usr/bin/env node
import { exec } from "child_process";
import os from "os";
import fs from "fs/promises";

const execAsync = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

(async () => {
  try {
    // Add the pre-hooks in core.hooksPath in git config file
    await execAsync("git config core.hooksPath ./node_modules/@rysun/security-gate/.security-gate");

    const type = os.type();
    if (type !== "Windows_NT") {
      await execAsync("chmod ug+x ./node_modules/@rysun/security-gate/.security-gate/*");
    }

    // Template for pre hooks
    const template = `#!/usr/bin/env sh

export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"

a=$(nvm ls | grep 'node')
b=\${a#*(-> }
v=\${b%%[)| ]*}

export PATH="$NVM_DIR/versions/node/$v/bin:$PATH"

node ./node_modules/@rysun/security-gate/lib/esm/index.js`;

    // Write the template in pre-commit and pre-push shell files if OS type is 'Linux'
    if (type === "Linux") {
      await fs.writeFile(`./node_modules/@rysun/security-gate/.security-gate/pre-commit`, template);
      await fs.writeFile(`./node_modules/@rysun/security-gate/.security-gate/pre-push`, template);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
