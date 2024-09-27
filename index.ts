import fs from 'fs/promises'; // Use fs/promises for modern, promise-based file operations
import { glob } from 'glob';
import path from 'path'; // Import path module to handle file and directory paths

// Function to check for console.log in the given file and detect line number
const lintFile = async (filePath: string): Promise<void> => {
    try {
        // Check if the path is a file before reading
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) return; // Skip if not a file

        const data = await fs.readFile(filePath, 'utf-8');
        const lines = data.split('\n');

        // Check for 'console.log(' in each line and get the line number
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

// Function to get all file names ignoring node_modules
const getFileNames = async (): Promise<string[]> => {
    return glob('**', { ignore: 'node_modules/**' });
};

// Main function to execute the file linting
const main = async () => {
    try {
        const fileNames = await getFileNames();
        for (const fileName of fileNames) {
            if (!fileName.startsWith('node_modules') && !fileName.startsWith('dist') && !fileName.startsWith('.')) {
                await lintFile(fileName); // Await to ensure linting completes before moving to the next file
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

main();
