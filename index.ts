import fs from 'fs';
import glob from "glob";

//this function check the console.log in all the existing files 
const lintFile = (filePath: string) => {
    fs.readFile(`./${filePath}`, "utf-8", (err, data) => {

        try {
            if (data?.includes("console.log(")) {
                throw new Error(`${process.cwd()}/${filePath} contains console.log() please remove it.`)
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
        //iuhcujdiudvh
    })
}

// get the all filenames with .js, .ts, .tsx, .jsx extension
let fileNames: string[] = []
glob("**/*.js", (err, files) => {
    files.forEach(element => {
        fileNames.push(element)
    });
})

glob("**/*.ts", (err, files) => {
    files.forEach(element => {
        fileNames.push(element)
    });
})

glob("**/*.tsx", (err, files) => {
    files.forEach(element => {
        fileNames.push(element)
    });
})

glob("**/*.jsx", (err, files) => {
    files.forEach(element => {
        fileNames.push(element)
    });
    
    for (let i of fileNames) {
        if (!i.startsWith("node_modules") && !i.startsWith("dist") && !i.startsWith(".")) {
            lintFile(i)
        }
    }
})
