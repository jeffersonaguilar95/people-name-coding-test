# People Name Coding Test

###### Prerequisites
- Node.js v16 LTS

## Running locally
To run the script using the default input data file you just need to run the command below

`npm run start`

### Set custom input data or N value

#### Linux, MacOS, Git Bash 

`INPUT_FILE_NAME="your-custom-input-file.txt" N=35 npm run start`

#### Windows 

###### Powershell
```
$env:INPUT_FILE_NAME="your-custom-input-file.txt"
$env:N=35
npm run start
```

###### CMD
```
set INPUT_FILE_NAME=your-custom-input-file.txt
set N=35
npm run start
```

## Running unit tests

`npm run test`