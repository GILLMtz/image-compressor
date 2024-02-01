
<div align="center">

![dd](./media/logo.svg)



[![En](https://img.shields.io/badge/Language-En-eaff96?logo=Microsoft-Translator&logoColor=white)](./README.md)


 [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
 ![s](https://img.shields.io/badge/Status-development-orange)


</div> 


 
**Image Compressor** es una herramienta de línea de comandos desarrollada sobre el proyecto [imagemin](https://www.npmjs.com/package/imagemin). Permite comprimir una imagen o un conjunto de imágenes. Admite imágenes en los formatos: `.jpg, .png, .svg, .gif y .webp.` 

Las especificaciones de compresión se establecen mediante un archivo externo.  

 
## Features
- Compress GIF images
- Compress JPEG images
- Compress PNG images
- Compress SVG images
- Compress WEBP images

## Instalación

1. Clone the repo
   ```sh
   git clone https://github.com/GILLMtz/image-compressor.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Usos / Ejemplos
### Ejecución estableciendo la configuración mediante un archivo externo.

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

## Documentación


 
| Param             |  Description                                                       |
| :-----------------|:------------------------------------------------------------------ |
| `-inputFolder`      | Ruta donde se encuentra la imagen o imágenes por comprimir                                                  |
| `-outputFolder`     | Directorio donde se guardan los archivos producidos mediante la compresión |
| `-generateWebpFiles`| Indica de la obtención de un archivo en formato `.webp` como resultado del proceso de compresión para los formatos `.png y .jpg` |
| `-log `             | Indica si durante el proceso de compresión deberán mostrarse logs|

## Tecnologías


[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## Licencia

Este proyecto está sujeto a la licencia MIT.
