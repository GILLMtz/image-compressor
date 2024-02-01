import imageProcess from "../src/compression-process.js";
import cli from "../src/command-line-interface.js";



const newImgP=imageProcess.create("test",cli.getConfig());
imageProcess.run(newImgP);