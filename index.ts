import fs from 'fs';
import { glob } from "glob";

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
    })
}

const getFileNames = async () => {
    const data = await glob('**', { ignore: 'node_modules/**' })
    return data
}

getFileNames().then((fileNames =>{
    for (let i of fileNames) {
        if (!i.startsWith("node_modules") && !i.startsWith("dist") && !i.startsWith(".")) {
            lintFile(i)
        }
    }
}))
