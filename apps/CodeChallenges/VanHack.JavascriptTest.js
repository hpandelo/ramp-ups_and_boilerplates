/**
 * This test consists in a side-by-side comparison of the original file and the expected output
 * The output is printed in the console
 * Usage: `node ./VanHack.JavascriptTest.js ./text.txt ./text2.txt -s 80 -c 2`
 */

const fs = require('fs');

/**
 * Since Math.max(n) haven't worked, I'm extending the Array API to supports something similar
 * OBS* A Simple Array.prototype.max should resolve, but I don't wanna see this property when iterating :)
 */
Object.defineProperty(Array.prototype, "max", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function() {
        if (!this.length) {
            // Empty Arrays can't be reduced
            return 0;
        }
        return this.reduce((previous, current) => previous > current ? previous : current)
    }
});

/**
 * Extends String API to make chunks of strings
 */
Object.defineProperty(String.prototype, "chunk", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(size) {
        if (!this.length) {
            // Empty String shouldn't be "chunked"
            return [''];
        }
        const expression = new RegExp(`(.{${size.toString()}})`);
        return this.split(expression).filter((value) => !!value.length);
    }
});

/**
 * Check if the flag exists in arguments
 */
const flagExists = (flag) => process.argv.indexOf(flag) !== -1;

/**
 * Extract argument value
 */
const getFlagValue = (flag) => {
    const DEFAULT_VALUE = (flag === '-c') ? 2 : 0;

    // FAIL FAST: Returns the default value when there's no flag available in arguments
    if (!flagExists(flag)) {
        return DEFAULT_VALUE;
    }

    // Extract flag value
    const flagIndex = process.argv.indexOf(flag);
    const valueIndex = flagIndex + 1;
    const flagValue = process.argv[valueIndex];

    // Prevent invalid values
    const isValid = (!isNaN(flagValue) && flagValue > 0)
    return isValid ? flagValue : DEFAULT_VALUE;
}

/**
 * Get Column Width
 * Return only the argument value of -s flag
 */
const getColumnWidth = () => getFlagValue('-s');

/**
 * Get Column Padding (Extra space between each column)
 * Return only the argument value of -c flag or 2 as default value
 */
const getColumnSpace = () => getFlagValue('-c');

/**
 * Returns only arguments (without nodejs path and js file path)
 */
const getValidArguments = () => process.argv.slice(2);

/**
 * Return only the files provided in Arguments
 */
const getFiles = () => {
    const files = [];
    const expectedFlags = ['-s', '-c'];
    const validArgs = getValidArguments();

    for (let index = 0; index < validArgs.length; index++) {
        const arg = validArgs[index];

        // This will make the loop "jump" over the flags if there's flags messed with files in arguments list
        const isFlag = expectedFlags.includes(arg);
        (isFlag) ? index++ : files.push(arg);
    }

    return files;
}

/**
 * Extract the file content
 */
const extractFileContent = async(filepath) => await fs.promises.readFile(filepath, 'utf8');

/**
 * Returns the longest line length in a file (file lines array)
 */
const getLongestLineSize = (lines) => lines.map((line) => line.length).max();

/**
 * Split each line break into an array
 */
const splitLines = (content) => {
    const LINE_BREAK = /[\r\n]/;
    const columnWidth = getColumnWidth();
    const splittedByLines = content.split(LINE_BREAK);

    // FAIL FAST: If there's no Column Width defined, don't need to chunk the line content
    if (!columnWidth) {
        return splittedByLines;
    }

    // Chunks each line on max column size
    return splittedByLines.flatMap((line) => line.chunk(columnWidth));
}

/**
 * Normalize Content Line with Padding and Replacing Tabs by Double Spaces
 */
const normalizeContentLines = (contentLines, paddingSize) => {
    const TAB = /\t/;
    const FOUR_SPACES = '    ';
    const PAD_FILL = ' ';

    return contentLines.map((line) => {
        const noTabLine = line.replace(TAB, FOUR_SPACES);
        const paddedLine = noTabLine.padEnd(paddingSize, PAD_FILL);
        return paddedLine;
    });
}

/**
 * Make all lines ready to be displayed
 */
const getLinesToDisplay = (outputs, columnSpace) => {
    const EMPTY_SPACE = ' ';
    const longestFileSize = outputs.map((output) => output.content.length).max();
    const columnSpaceStr = String().padEnd(columnSpace, EMPTY_SPACE);

    const lines = [];
    for (let i = 0; i < longestFileSize; i++) {
        let outputLine = outputs.map((output) => {
            return (output.content[i]) ?
                output.content[i].padEnd(output.columnSize, EMPTY_SPACE) : String().padEnd(output.columnSize, EMPTY_SPACE);
        }).join(columnSpaceStr)

        lines.push(outputLine);
    }

    return lines;
}

/**
 * Main Function
 */
(async() => {
    const files = getFiles();
    const columnSpace = getColumnSpace();

    const outputs = [];
    for (let file of files) {
        const rawContent = await extractFileContent(file);
        const contentLines = splitLines(rawContent);
        const columnSize = getLongestLineSize(contentLines);
        const content = normalizeContentLines(contentLines, columnSize);

        outputs.push({
            columnSize,
            content,
        })
    }

    const lines = getLinesToDisplay(outputs, columnSpace);
    const result = lines.join('\n');

    console.log(result);
})()