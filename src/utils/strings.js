export function subStr(strOrigin, indexInitial, indexEnd) {
    if ((indexInitial == indexEnd) ||
        ((indexInitial < 0) || (indexEnd < 0)) ||
        (indexInitial > indexEnd) ||
        (indexEnd > strOrigin.length)) {
        return null;
    }
    let stResult = "";
    for (let i = indexInitial; i <= indexEnd; i++) {
        stResult += strOrigin[i];
    }
    return stResult;
}