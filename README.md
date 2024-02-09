
<div align="center">



![dd](./media/logo.svg)



[![Es](https://img.shields.io/badge/Language-Es-eaff96?logo=Microsoft-Translator&logoColor=white)](./README-es.md)

[![Node-js](https://img.shields.io/badge/nodejs-20.9.0-brightgreen)](https://nodejs.org/en)
 [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
 ![s](https://img.shields.io/badge/Status-development-orange)





</div> 


 
**Image Compressor** is a command line tool developed on the [imagemin](https://www.npmjs.com/package/imagemin) project. Allows you to compress an image or a set of images. Supports images in the formats: `.jpg, .png, .svg, .gif y .webp.` 

Compression specifications are set using an external file.

 
## Features
- Compress GIF images
- Compress JPEG images
- Compress PNG images
- Compress SVG images
- Compress WEBP images

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/GILLMtz/image-compressor.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Usage/Examples
### Run using configuration in external file

`Run `
```javascript
npm start -- -configFile=config.ic
```

`Content in config.ic`

```javascript
-inputFolder="my-spotify/media" 
-outputFolder="compressed"
-generateWebpFiles="false" jjbl jkhhj
-log="false"
```


![Run with config file](./media/run-with-config-file.gif)

## Documentation


 
| Param             |  Description                                                       |
| :-----------------|:------------------------------------------------------------------ |
| `-inputFolder`      | Path where the image or images to be compressed are located                                                  |
| `-outputFolder`     | Directory where the files produced by compression are saved |
| `-generateWebpFiles`| Indicates obtaining a file in `.webp` format as a result of the compression process for the `.png and .jpg` formats |
| `-log `             | Indicates whether the logs should be displayed during the compression process.|

## Technologies


[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## License

This project is licensed under the MIT License.
