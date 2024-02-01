import { InputType } from '../models/model.js';
import { Constantes as Const, DefaultConfig } from '../constantes.js';
import log from '../utils/log.js';
import { subStr } from '../utils/strings.js';

const CLIRegex = {
    FileCmdStruc: new RegExp(`[.]{0}-[^${Const.specCharAsStrWithEsc()}\\s]+=["][^"\n]+["]|[.]{0}-[^ ${Const.specCharAsStrWithEsc()}\\s]+=['][^'\n]+[']|[.]{0}-[^${Const.specCharAsStrWithEsc()}\\s]+=[^\s'"]+`
        , "g"
    ),
    FileCmdValue: new RegExp(`/["].*["]|['].*[']/`, "g"),
    CliCmdStruc: new RegExp(
        `[.]{0}-[^${Const.specCharAsStrWithEsc()}\s]+=[^\s]*[\s]{0}`,
        "g"
    )
}



function clearTokenFormat(token, type) {
    const pattern = type === InputType.CLI_FILE_PARAMS ? CLIRegex.FileCmdStruc : CLIRegex.CliCmdStruc;
    const result = token.match(pattern);
    if (result) {
        const clearToken = result[0].replace(/['"]+/g, '');
        return clearToken;
    }
    log.showError(`Don't clear token: #{${[token]}}`);
    return null;
}

/**
 * 
 * @param {arry} args  -Array of raw commands. 
 * Expect an array of commands like :
 * -FILE_PARAMS : ['-command="value"  \r','-command2="value2" \r',...,'-commandN="valueN"  ']
 * -CLI_PARAMS : ['-command=value','-command2=value2',...,'-commandN=valueN']
 * @param {InputType} type -Determine origin of params (FILE or CLI)
 * @returns tokens: {-comandToken-1: valueToken-1,...,-comandToken-N: valueToken-N}
 */


export function tokenize(args, type) {
    if (args.length == 0 || type == null) { return null; }
    let params = {};
    args.forEach((arg, index) => {
        const cmdStruc = clearTokenFormat(arg, type);   //get command structure
        if (cmdStruc) {
            let [key, value] = cmdStruc.split('=');//tokenize command 
            params[key] = value;
        }
    });

    return params;
}

function complementConfig(config, refParams) {
    let newConfig={...config}; //create superficial copy of object config
    Object.keys(refParams ).forEach((keyParam) => {
        const keyParamClear=subStr(keyParam,1,keyParam.length-1);
        if( !(keyParamClear in config)){
            newConfig[keyParamClear] = DefaultConfig[keyParamClear];
        }
    });
    return newConfig;
}


/**
 * 
 * @param {Array} tokens
 * {
 * token1:value,
 * token2:value2,
 * ...
 * tokenN:valueN
 * }
 * 
 * @returns Object of config
 * {
 * param:value,
 * param2:value2,
 * ...
 * paramN:valueN
 * }
 */

export function getConfig(tokens, refParams) {
    let config = {};
    
    Object.entries(tokens).map(t=>{
        let [keyParam, valueToken] = t;
        if (keyParam in refParams) {   //validate name and value in each tokens
            const keyParamClear=subStr(keyParam,1,keyParam.length-1);
            if(keyParamClear){
                if(valueToken==="true"||valueToken==="false"){
                    valueToken=(valueToken==="true")?true:false;
                }
                config[keyParamClear] = valueToken;
            }
        } 
    });

    config=complementConfig(config, refParams); //complement config with default values if missing parameters 
    return config;
}

export default { getConfig,  tokenize };