import { promises as fs } from 'fs';
import { glob } from "glob";
import path from 'path';

//this function check the console.log in all the existing files 
const lintFile = async (filePath: string) => {
    try {
        const fullPath = path.resolve(filePath); // Get absolute path

        // Check if path is a directory
        const stats = await fs.stat(fullPath);
        if (!stats.isDirectory()) {         

            // Read file contents
            const data = await fs.readFile(fullPath, "utf-8");

            // Check for forbidden content
            if (data.includes("console.log(")) {
                throw new Error(`${fullPath} contains console.log() please remove it.`);
            }
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
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
