const extractText = require("./logic/extractText");
const resizeImage = require("./logic/resizeImage");
const greyscaleImage = require("./logic/greyscaleImage");
const { unlinkSync } = require("fs");

async function extract(file) {
    const lastDot = file.lastIndexOf(".");
    const newFile = file.substr(0, lastDot) + "-resized" + file.substr(lastDot, file.length - lastDot);
    const newFile2 = file.substr(0, lastDot) + "-greyscaled" + file.substr(lastDot, file.length - lastDot);

    // await resizeImage(file, newFile);
    await greyscaleImage(file, newFile2);

    const extracted = await extractText(newFile2);

    // unlinkSync(newFile);
    unlinkSync(newFile2);
    
    return extracted;
}

(async () => {
    const result = await extract("./test/example1.png");

    console.dir(result);
})();