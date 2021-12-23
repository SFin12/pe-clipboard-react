export function saveRoster(e, callback) {
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
}

function cleanText(string) {
    let cleanString = string;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (cleanString && !isNaN(Number(cleanString[0]))) {
        cleanString = cleanString.slice(1);
        return cleanText(cleanString);
    }
    if (
        cleanString &&
        cleanString[0].toUpperCase() === cleanString[0].toLowerCase() &&
        isNaN(Number(cleanString[0]))
    ) {
        cleanString = cleanString.slice(1);
        return cleanText(cleanString);
    }
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
