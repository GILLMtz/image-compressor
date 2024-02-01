import fse from 'fs-extra';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';
import imageminGifsicle from 'imagemin-gifsicle';
 
 

import {  execSync } from 'child_process';

import log from './utils/log.js';

import loader from './utils/loader.js';

/**
 * Checks if the file extension is included in the given list of extensions.
 *
 * @param {string} file - the file name with extension
 * @param {Array<string>} extensions - the list of allowed extensions
 * @return {boolean} true if the file extension is included in the extensions list, otherwise false
 */
function containsExtension(file,extensions){
    return extensions.includes(file.split('.').pop());
}

async function getFiles(folder){ 

    try
    {
        const files = await fse.readdir(folder);
        return files;
    }
    catch (err) {

        log.showError(`Error reading directory ${folder} \n Error ${err}`);
        return null;
    }
 
}

function start(files,config){
return new Promise(async (resolve, reject)=>{
    
    if(!files){
        reject();
        return;
    }
    loader.show(files.length);
    for (const file of files) {

        try {
            await imagemin([ `${config.inputFolder}/${file}` ], {
                destination:  config.outputFolder ,
                plugins: [
                    imageminJpegtran({ quality: 80 }), 
                    imageminPngquant(), 
                    imageminSvgo(), 
                    imageminGifsicle(),  
                ]
            });

            loader.sendMessage(`compressed ${file}`);
            log.showSuccess(`compressed ${file}`,config.log);

        } catch (error) {
            log.showError(`Error compressing ${file} \n Error ${error}`);
        }


 
         if(config.generateWebpFiles||containsExtension(file,["webp"])){
            try {
                await imagemin([`${config.inputFolder}/${file}`], {
                    destination: config.outputFolder,
                    plugins: [
                        imageminWebp({ quality: 80 }), //Comprimir imagen webp
                    ]
                });

               
                log.showSuccess(`Generate file .webp for ${file} \n save in ${config.outputFolder }`,config.log);
            } catch (error) {
                log.showError(`Error generating .webp by ${file} \n Error ${error}`);
            }
         }
 
         
     }
     log.showSuccess("Compression process end",config.log,false);
    await loader.close();
     resolve();
});
}

const compressor=async({name,config}) =>{
    const files=await getFiles(config.inputFolder);

    start(files,config)
   .then(()=>resumeProcess(config.inputFolder, config.outputFolder,config))
   .catch(err=>log.showError(  `Don't compress process (${name})  ${err} `,config.log,false ));
}

function getInfoFile(command) {
    try {
        let result= execSync(command).toString().split(' ')[4];
        return result;
    } catch (err) {
        log.showWarning(`Error reading directory information ${folder} \n Error ${err}`);
        return null;
    }
}

function showResultCommand(originalFiles, resultFiles,config) {
 
    const originalFileCmd = `ls ${originalFiles} -la -h`;
    const resultFileCmd = `ls ${resultFiles} -la -h`;

    if(config.generateWebpFiles){
        return {
            original: getInfoFile(originalFileCmd),
            result: getInfoFile(resultFileCmd),
            webp:containsExtension(resultFiles,["svg","gif"])?" ":  getInfoFile(resultFileCmd.replace(/\.[^.\s]*/, ".webp"))
        };
    }

    return {
        original: getInfoFile(originalFileCmd),
        result: getInfoFile(resultFileCmd)
    };
}

async function resumeProcess(inputFolder, outputFolder,config) {
    let resume = {};
    const files = await fse.readdir(inputFolder);
    for (const file of files) {
        resume[file] = showResultCommand(`${inputFolder}/${file}`, `${outputFolder}/${file}`,config);
    }
    console.table(resume);
}
export { compressor };