import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';

// Function to check for console.log in the given file and detect line number
const lintFile = async (filePath: string): Promise<void> => {
    try {
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) return; 

        const data = await fs.readFile(filePath, 'utf-8');
        const lines = data.split('\n');

        lines.forEach((line, index) => {
            if (line.includes('console.log(')) {
                throw new Error(`${process.cwd()}/${filePath} contains console.log() on line ${index + 1}. Please remove it.`);
            }
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const getFileNames = async (): Promise<string[]> => {
    return glob('**', { ignore: 'node_modules/**' });
};

const main = async () => {
    try {
        const fileNames = await getFileNames();
        for (const fileName of fileNames) {
            if (!fileName.startsWith('node_modules') && !fileName.startsWith('dist') && !fileName.startsWith('.')) {
                await lintFile(fileName); 
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

main();
