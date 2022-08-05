const fs = require("fs");
const readline = require("readline");

const startTime = Date.now();
const INPUT_FILE_NAME = process.env.INPUT_FILE_NAME || "coding-test-data.txt";
const N = process.env.N || 25;

const indexedResults = {
  firstNamesMap: new Map(),
  lastNamesMap: new Map(),
  fullNamesMap: new Map(),
  uniqueFullNamesMap: new Map(),
  uniqueFirstNamesSet: new Set(),
};

function main() {
  const filePath = `${__dirname}/${INPUT_FILE_NAME}`;
  const readableStream = fs.createReadStream(filePath, "utf8");

  const readInterface = readline.createInterface({
    input: readableStream,
    console: false,
  });

  return new Promise((resolve, reject) => {
    readInterface.on("line", function (line) {
      const regex = new RegExp(/^([a-zA-Z]+), ([a-zA-Z]+)/i);
      const result = regex.exec(line);

      if (result) {
        const [fullName, lastName, firstName] = result;
        const {
          fullNamesMap,
          lastNamesMap,
          firstNamesMap,
          uniqueFullNamesMap,
          uniqueFirstNamesSet,
        } = indexedResults;

        if (
          !uniqueFirstNamesSet.has(firstName) &&
          !uniqueFullNamesMap.get(lastName) &&
          uniqueFullNamesMap.size < N
        ) {
          uniqueFullNamesMap.set(lastName, firstName);
          uniqueFirstNamesSet.add(firstName);
        }

        fullNamesMap.set(fullName, fullNamesMap.get(fullName) + 1 || 1);
        firstNamesMap.set(firstName, firstNamesMap.get(firstName) + 1 || 1);
        lastNamesMap.set(lastName, lastNamesMap.get(lastName) + 1 || 1);
      }
    });

    readInterface.on("close", async () => {
      // Returns an array with the top ten last names
      const topTenLastNames = getTopTenCommon(indexedResults.lastNamesMap);
      // Returns the top ten last names formatted for output
      const topTenLastNamesFormatted =
        getTopTenCommonFormatted(topTenLastNames);

      // Returns an array with the top ten first names
      const topTenFirstNames = getTopTenCommon(indexedResults.firstNamesMap);
      // Returns the top ten first names formatted for output
      const topTenFirstNamesFormatted =
        getTopTenCommonFormatted(topTenFirstNames);

      // Returns the output file content string
      const outputContent = buildOutput(
        topTenLastNamesFormatted,
        topTenFirstNamesFormatted
      );

      // I'm not using streams for writing this file because
      // is going to be pretty small always
      try {
        await fs.promises.writeFile(
          `${__dirname}/coding-test-output.txt`,
          outputContent
        );
      } catch (err) {
        console.error(err);
        reject();
      }

      // Returns the modified names string to print
      const modifiedNames = getModifiedNames(
        indexedResults.uniqueFullNamesMap
      ).join("\n");

      console.log(modifiedNames);

      const stopTime = Date.now();
      console.log(
        `Time Taken to execute = ${(stopTime - startTime) / 1000} seconds`
      );

      resolve();
    });
  });
}

function getTopTenCommon(mapInstance) {
  return Array.from(mapInstance)
    .map(([subKey, value]) => ({
      key: subKey,
      value,
    }))
    .sort((a, b) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    })
    .slice(0, 10);
}

function getTopTenCommonFormatted(items) {
  let result = "";
  for (const item of items) {
    result += `    ${item.key}: ${item.value} \n`;
  }
  return result;
}

function getModifiedNames(mapInstance) {
  return Array.from(mapInstance).reduce(
    (names, [currentLastName], index, originalNames) => {
      const prevIndex = index ? index - 1 : originalNames.length - 1;
      const [, prevFirstName] = originalNames[prevIndex];
      names.push(`${currentLastName}, ${prevFirstName}`);

      return names;
    },
    []
  );
}

function buildOutput(topTenLastNamesFormatted, topTenFirstNamesFormatted) {
  return `1. The names cardinality for full, last, and first names:
    Full names: ${indexedResults.fullNamesMap.size}
    Last names: ${indexedResults.lastNamesMap.size}
    First names: ${indexedResults.firstNamesMap.size}

2. The most common last names are:
${topTenLastNamesFormatted}
3. The most common first names are:
${topTenFirstNamesFormatted}
`;
}

module.exports = {
  main,
};
