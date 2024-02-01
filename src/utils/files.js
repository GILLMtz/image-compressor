import {readFileSync} from 'node:fs';
import log from './log.js';

function readData(pathFile){
 try{
   return readFileSync(pathFile, 'utf8');
 }catch(err){
  log.showError(`Don't read config of file ${pathFile} ${err}`); 
   return null;
 }
}

export default {readData};