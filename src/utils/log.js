import chalk from 'chalk';
import { subStr } from './strings.js';
/** Documentation
 * Include all text to highlight in a message with #{...}
 * 
 * 
 */

const HGLRegex = new RegExp(
    "#{[^}{]+}"
    , "g"
);// equivalent to #{......}

const LogType = {
    SUCCESS: 0,
    ERROR: 1,
    WARNING: 2,
    MESSAGE: 3
}

/**
 * @param {string} message
 * @returns {string[]} all Highlight items
 */
function getHGLItems(message) {
    return message.match(HGLRegex);
}


function getPosInit(strOrigin, item) {
    return strOrigin.indexOf(item);
}

function splitMessage(message, hglItems) {
    if (message.length == 0 ||
        hglItems.length == 0) {
        return [];
    }
    let resultStrs = [];
    let initPos = 0, endPos = 0;

    for (let hglItem of hglItems) {
        endPos = hglItem.initialPos - 1;
        const previsousSubStr = subStr(message, initPos, endPos);   //get previsous substring to current hglItem
        if (previsousSubStr) { resultStrs.push(previsousSubStr); }
        resultStrs.push(hglItem.item);    //get substring of  current hglItem
        initPos = hglItem.initialPos + hglItem.item.length;
    }
    return resultStrs;
}

function structureLog(str, logType) {
    const hglItems = getHGLItems(str);
    if (!hglItems) {
        return styleLog(logType, str, false);//Dont resalt items in str 
    }

    const resultItems = hglItems.map((item) => {
        const pos = getPosInit(str, item);
        return { item, initialPos: pos >= 0 ? pos : null }
    });

    return splitMessage(str, resultItems).map(str => {
        const isHglItem = hglItems.find((hglItem) => hglItem === str);
        return styleLog(logType, str, isHglItem);
    }).join('');
}


function setFormat(str) {
    str = JSON.stringify(str);
    return subStr(str, 1, str.length - 2);
}

function styleLog(logType, str, isHglItem) {
    str = (isHglItem) ? subStr(str, 2, str.length - 2) : str; //remove highlight Characters
    str = setFormat(str);
    switch (logType) {
        case LogType.SUCCESS:
            return isHglItem ? chalk.bgGrey(chalk.black(str)) : chalk.green(str);
            break;
        case LogType.ERROR:
            return isHglItem ? chalk.bgGrey(chalk.black(str)) : chalk.red(str);
            break;
        case LogType.WARNING:
            return isHglItem ? chalk.bgGrey(chalk.black(str)) : chalk.yellow(str);
            break;
        default:
            return "";
            break;
    }
}

function show(message) { console.log(message); }

function showError(message, active = true, singleMessage=true) {
    if (!active) { return; }
    const category = " Error ";
  /*   const fullMessage = `${chalk.bgRed(
        chalk.black(category))} ${structureLog(message, LogType.ERROR)}`; */

    const categoryWithFormat= `${chalk.bgRed(chalk.black(category))}`;    
    const messageWithFormat= `${structureLog(message, LogType.ERROR)}`;   

    const fullMessage = singleMessage ?messageWithFormat : `${categoryWithFormat} ${messageWithFormat}\n`;  
    

    show(fullMessage);
}

function showSuccess(message, active = true,singleMessage=true) {
    if (!active) { return; }
    const category = " Success ";
 
    const categoryWithFormat= `${chalk.bgGreen(chalk.black(category))}`;    
    const messageWithFormat= `${structureLog(message, LogType.SUCCESS)}`;   

    const fullMessage = singleMessage ?messageWithFormat : `${categoryWithFormat} ${messageWithFormat}\n`;  

    show(fullMessage);
}

function showWarning(message, active = true, singleMessage=true) {
    if (!active) { return; }
    const category = " Warning ";

    const categoryWithFormat= `${chalk.bgYellow(chalk.black(category))}`;
    const messageWithFormat= `${structureLog(message, LogType.WARNING)}`;

const fullMessage = singleMessage ?messageWithFormat : `${categoryWithFormat} ${messageWithFormat}\n`;  
    show(fullMessage);
}


export default { showError, showSuccess, showWarning };