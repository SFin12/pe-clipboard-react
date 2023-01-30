// Save roster loaded from csv file.
export function saveRoster(e, callback) {
    
    if (e.target.files[0]) {
        const csvInput = e.target.files[0];
        const reader = new FileReader();
        let formattedArr = [];

        reader.onload = function () {
            const arr = reader.result.split("\n");
            
            for (let student of arr) {
                const cleanedStudent = cleanText(student);
                if (cleanedStudent) {
                    formattedArr = [...formattedArr, cleanedStudent];
                }
            }
            return callback(formattedArr);
        };

        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsText(csvInput);
    } else {
        alert(
            "Error when loading csv file.  Make sure there is at least one student and the file type ends with .csv"
        );
    }
}

function cleanText(string) {
    let cleanString = string;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // if a string is present and the first part of the string is a number, cut it out and take the rest
    if (cleanString && !isNaN(Number(cleanString[0]))) {
        cleanString = cleanString.slice(1);
        return cleanText(cleanString);
    }
    // if the first character is something other than a letter, cut it out and take the rest
    if (
        cleanString &&
        cleanString[0].toUpperCase() === cleanString[0].toLowerCase() &&
        isNaN(Number(cleanString[0]))
    ) {
        cleanString = cleanString.slice(1);
        return cleanText(cleanString);
    }
    // if the last character is something other than a letter, cuat it out and take everthing before it
    if (
        cleanString &&
        cleanString[string.length - 1].toUpperCase() ===
            cleanString[string.length - 1].toLowerCase() &&
        !nums.includes(Number(cleanString[string.length - 1]))
    ) {
        cleanString = cleanString.slice(0, cleanString.length - 1);

        return cleanText(cleanString);
    }
    if (cleanString.length > 0) {
        return cleanString;
    } else {
        return null;
    }
}
