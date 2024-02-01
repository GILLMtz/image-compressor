import compProcess from '../compression-process.js';
import file from '../utils/files.js';
import {InputType, Mode } from '../models/model.js';
import { SystemParams } from './models.js';
import {tokenize,getConfig} from './analyzer.js';

function isFileParams(args) {
    const numberParamsRequired = 1;
    if (args.length != numberParamsRequired) {
        return false;
    }
    const pattern = /-configFile=["][^"]+["][.]{0,1}|-[^\s]+=[^\s]+/;
    const result = args[0].match(pattern);
    return !result ? false : true;
}

function isCliParams(args) {
    const minNumberParamsRequired = 2;
    if (args.length < minNumberParamsRequired) {
        return false;
    }

    const inputPattern = /-inputFolder=[^\s]+/;
    const outputPattern = /-outputFolder=[^\s]+/;

    let inputParamMatched = 0;
    let outputParamMatched = 0;
    args.forEach(arg => {
        inputParamMatched = arg.match(inputPattern) ? inputParamMatched + 1 : inputParamMatched;
        outputParamMatched = arg.match(outputPattern) ? outputParamMatched + 1 : outputParamMatched;

    })

    return (inputParamMatched + outputParamMatched) == minNumberParamsRequired ? true : false;
}

function isMode(mode, args) {
    if (mode === Mode.CLI_FILE_PARAMS) {
        return isFileParams(args);
    }
    if (mode === Mode.CLI_PARAMS) {
        return isCliParams(args);
    }
    if (mode === Mode.CLI_INTERACTIVE) {
        return true;
    }
    return false;
}

export function start() {

    const args = process.argv.slice(2);
    if (isMode(Mode.CLI_FILE_PARAMS, args)) {
     let tokenFile=  tokenize(args, InputType.CLI_FILE_PARAMS);
        let data=file.readData(tokenFile['-configFile']);
        if(data){
            data= data.split('\n');
            const tokens=tokenize(data,InputType.CLI_FILE_PARAMS);

            let config=getConfig(tokens,SystemParams);
             
            const newImgP=compProcess.create(tokenFile['-configFile'],config);
            compProcess.run(newImgP);
        }
      //  return;
    }

    // if (isMode(Mode.CLI_PARAMS, args)) {    }
    // if (isMode(Mode.CLI_INTERACTIVE, args)) { } 

}

export default {  start};
