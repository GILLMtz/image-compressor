import stateHandler from "../state-handler.js";
import chalk from "chalk";

const AnimationFrames = ["\\", "|", "/", "-"];
let lastAnimationFrame = 0;
let LoaderMessagesQueue = [];

let totalProgressBarItems = 0;
let ItemProcessed = 0;
const NBars = 10;
const ProgressBart = Array(NBars).fill(".");




function show(totalItems, loaderName = null) {
    totalProgressBarItems = totalItems;
    return new Promise((resolve, reject) => {

        const loaderCounter = setInterval(() => {
            render(lastAnimationFrame);
            lastAnimationFrame = (lastAnimationFrame < AnimationFrames.length - 1) ? lastAnimationFrame + 1 : 0;
            //
        }, 100);
        stateHandler.setLoaderCounter(loaderCounter);
    });
}





function render(index = 0) {
    let message = getItemOfQueue();
    //const loaderContent="  \t  \r" + AnimationFrames[index] + " compressing";
    refresh();
    const loaderPrefixFormat = `\r[${getProgressBar()}]  [${AnimationFrames[index]}] ${chalk.magentaBright('compressing')} `;
    const loaderMessageFormat = !message ? "" : `${chalk.green(message)}`;
    const loaderContent = `${loaderPrefixFormat}${loaderMessageFormat} `;
    process.stdout.write(loaderContent);

}
function refresh() {
    process.stdout.clearLine();
}
function sendMessage(message) {
    updateItemProcessed();
    addToQueue(message);
}

async function close() {
    const loaderCounter = stateHandler.getLoaderCounter();
    render(lastAnimationFrame);
    if (!loaderCounter) { return; }
    clearInterval(loaderCounter);
    refresh();
    process.stdout.write("    \n");

}

// Progress Bar

function getProgressBar() {
    const percentage = calcPBPercentage();
    return ProgressBart.map((pb, index) => {

        if ((index + 1) <= percentage) {
            return chalk.bgWhite(chalk.white(pb));
        } else {
            return chalk.black(pb);
        }
    }).join("");

}

function calcPBPercentage() {
    if (totalProgressBarItems == 0 || ItemProcessed == 0) { return 0; }
    return Math.round(((ItemProcessed / totalProgressBarItems) * 100) / NBars);
}

function updateItemProcessed() { ItemProcessed++; }

//Managment Queue Messages
function addToQueue(message) {
    LoaderMessagesQueue.push(message);
}

function queueIsEmpty() {
    return LoaderMessagesQueue.length == 0;
}

function getItemOfQueue() {
    if (queueIsEmpty()) { return null; }
    return LoaderMessagesQueue.shift();
}


export default { show, close, sendMessage };