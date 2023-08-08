"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
//this function check the console.log in all the existing files 
const lintFile = (filePath) => {
    fs_1.default.readFile(`./${filePath}`, "utf-8", (err, data) => {
        try {
            if (data === null || data === void 0 ? void 0 : data.includes("console.log(")) {
                throw new Error(`${process.cwd()}/${filePath} contains console.log() please remove it.`);
            }
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
        //iuhcujdiudvh
    });
};
// get the all filenames with .js, .ts, .tsx, .jsx extension
let fileNames = [];
(0, glob_1.default)("**/*.js", (err, files) => {
    files.forEach(element => {
        fileNames.push(element);
    });
});
(0, glob_1.default)("**/*.ts", (err, files) => {
    files.forEach(element => {
        fileNames.push(element);
    });
});
(0, glob_1.default)("**/*.tsx", (err, files) => {
    files.forEach(element => {
        fileNames.push(element);
    });
});
(0, glob_1.default)("**/*.jsx", (err, files) => {
    files.forEach(element => {
        fileNames.push(element);
    });
    for (let i of fileNames) {
        if (!i.startsWith("node_modules") && !i.startsWith("dist") && !i.startsWith(".")) {
            lintFile(i);
        }
    }
});
//# sourceMappingURL=index.js.map