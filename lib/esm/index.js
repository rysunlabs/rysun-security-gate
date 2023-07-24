import fs from 'fs';
import glob from "glob";
//this function check the console.log in all the existing files 
const lintFile = (filePath) => {
    fs.readFile(`./${filePath}`, "utf-8", (err, data) => {
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
glob("**/*.js", (err, files) => {
    files.forEach(element => {
        fileNames.push(element);
    });
});
glob("**/*.ts", (err, files) => {
    files.forEach(element => {
        fileNames.push(element);
    });
});
glob("**/*.tsx", (err, files) => {
    files.forEach(element => {
        fileNames.push(element);
    });
});
glob("**/*.jsx", (err, files) => {
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