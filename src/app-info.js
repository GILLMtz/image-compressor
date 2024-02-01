import chalk from 'chalk';
const title = ` 
_                                                                                     
| |                                                                                    
| |____  _____  ____ _____     ____ ___  ____  ____   ____ _____  ___  ___  ___   ____ 
| |    \\(____ |/ _  | ___ |   / ___) _ \\|    \\|  _ \\ / ___) ___ |/___)/___)/ _ \\ / ___)
| | | | / ___ ( (_| | ____|  ( (__| |_| | | | | |_| | |   | ____|___ |___ | |_| | |    
|_|_|_|_\\_____|\\___ |_____)   \\____)___/|_|_|_|  __/|_|   |_____|___/(___/ \\___/|_|    
              (_____|                         |_|                                                                                    
`;
function banner() {
    console.log(chalk.yellow(title));
}

function info() {
    const opstions = {
        "Params in CLI": `node app.js -inputFolder="my-file/media" -outputFolder="compressed" -generateWebpFiles=true -log="true"`,
        "Params in file": `node app.js -configFile="config.ic" 

        Example config.ic :

        inputFolder="my-file/media" 
        outputFolder="compressed"
        generateWebpFiles="true"
        log="true"`,
    }
    console.log(chalk.cyan("\nRun options : \n"));
    Object.entries(opstions).forEach(([key, value]) => {
        console.log('    ', chalk.cyanBright(key) + ': ', chalk.gray(value));

    })
}

export { info ,banner};