import { State } from "./constantes.js";

function getLoaderCounter(){
    return State.loaderCounter;
}

function setLoaderCounter(counter){
    State.loaderCounter=counter;
}


export default {getLoaderCounter,setLoaderCounter}