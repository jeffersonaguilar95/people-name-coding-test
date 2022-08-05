# People Name Coding Test

###### Prerequisites
Node.js v16 LTS or Docker v20 LTS

## Running locally (Node.js)
To run the script using the default input data file you just need to run the command below

`npm run start`

### Set custom env values

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

## Running locally (Docker)

###### Building and starting container
```
docker build . -t <username>/people-name-coding-test
docker run -d -it --name people-name-coding-test <username>/people-name-coding-test
```

###### Running script with default env values
`docker exec -it people-name-coding-test npm run start`

###### Running script with custom env values
`docker exec -it -e INPUT_FILE_NAME="your-custom-input-file.txt" -e N=35 people-name-coding-test npm run start`

## Running unit tests

```
npm install
npm run test
```
