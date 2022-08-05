const fs = require("fs")
const { faker } = require('@faker-js/faker');

const startTime = Date.now()
const outputFilename = 'coding-test-data-lg.txt'

for (let i = 0; i < 1000; i++) {
    let testFileContent = ''

    for (let j = 0; j < 1e6; j++) {
        const lastName = faker.name.lastName()
        const firstName = faker.name.firstName()
        const fullName = `${lastName}, ${firstName}`
        const adjective = faker.word.adjective()
        testFileContent += `${fullName} -- ${adjective} \n`
        testFileContent += `      ${faker.lorem.words()} \n`        
    }

    const saveToFile = fs.existsSync(outputFilename) ? fs.appendFileSync : fs.writeFileSync;
    console.log("i", i)
    saveToFile(outputFilename, testFileContent);
}

const stopTime = Date.now()
console.log(`Time Taken to execute = ${(stopTime - startTime)/1000} seconds`);
