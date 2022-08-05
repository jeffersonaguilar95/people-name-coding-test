const mock = require('mock-fs');
const { main } = require('./index');
const fs = require('fs');

const sampleInputContent = `Smith, Joan -- corporis
    Totam eos ut omnis et nemo dolore.
Smith, Sam -- ut
    Ut dolorem est voluptate fugit qui vitae.
Thomas, Joan -- modi
    Nesciunt magni suscipit maxime quaerat sint hic voluptate.
Upton, Joan -- veritatis
    Sed ut impedit harum.
Cartman, Eric -- tenetur
    Esse amet adipisicing commodo labore.
O'Shea, Peter`

describe('Process file with a list of names', () => {
    beforeAll(() => {
        process.env.INPUT_FILE_NAME = "coding-test-data.txt"

        mock({
            'coding-test-data.txt': sampleInputContent,
        });
    });

    afterAll(() => {
        mock.restore();
    });

    it('should generate an output file with the expected statistics', async () => {
        const expectedResult = `1. The names cardinality for full, last, and first names:
    Full names: 5
    Last names: 4
    First names: 3

2. The most common last names are:
    Smith: 2 
    Thomas: 1 
    Upton: 1 
    Cartman: 1 

3. The most common first names are:
    Joan: 3 
    Sam: 1 
    Eric: 1`.replace(/\s/g, "");
    
        let outputResponse = '';

        fs.promises.writeFile = jest.fn((_, output) => {
            outputResponse = output.replace(/\s/g, "")
            return Promise.resolve()
        });
    
        await main();

        expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);

        expect(outputResponse).toBe(expectedResult);
    });

    it('should print a list with modified names', async () => {
        const expectedResult = "Smith, Eric\nCartman, Joan";

        fs.promises.writeFile = jest.fn();

        const logSpy = jest.spyOn(console, 'log');
    
        await main();

        expect(logSpy).toHaveBeenCalledWith(expectedResult);
    });
})