import { compressor } from "./compressor.js"

function create(name,config,priority=0){ 
    return {name, config,priority}; 
}

function run(compProcess){
       compressor(compProcess);
}

export default { create,run}
