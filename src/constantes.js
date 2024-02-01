export let DefaultConfig={
    generateWebpFiles : false,
    log:false,
     inputFolder : null,
    outputFolder : null
   }
/*CommandStructure: /[.]{0}-[^\"\\\,\.\?\!\:\;\(\)\[\]\{\}\<\>\/\*\+\'\^\&\*\=\~\`\$\%\#\¿\|\s]+=["][^"]*["][\s]{0}/g */

export let Constantes={
    SpecialCharacters:
    ['"',`\\`,',','.','?','!',':',';','(',')','[',']','{','}',
    '<','>','/','*','+','\'',   '^','&','*','=','~','`','$','%','#','¿','|'],

    specCharAsStrWithEsc: function (){
        const sC= this.SpecialCharacters.map(c=>'\\'+c.toString()).join('');
        return sC;
    }
}   

export const State={
   loaderCounter:null
};
