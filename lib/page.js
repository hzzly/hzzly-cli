const fs = require("fs-extra");
const path = require("path");
const moment = require("moment");

module.exports = function(name) {
  // console.log(name);
  const data = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${name}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box
          }
          html, body {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient( #1abc9c, transparent), linear-gradient( 90deg, skyblue, transparent), linear-gradient( -90deg, coral, transparent);
            background-blend-mode: screen;
          }
          h1 {
            font-family: PoiretOne-Regular;
            font-size: 26px;
            font-weight: bold;
            font-style: normal;
            line-height: 50px;
            height: 50px;
            margin: 0 auto;
            letter-spacing: -.03em;
          }
        </style>
      </head>
      <body>
        <h1>${moment().format("YYYY-MM-DD HH:mm:ss")} page: ${name}.html</h1>
      </body>
      </html>
    `;

  let file = path.join(process.cwd(), `page-${name}.html`);
  // console.log(file);
  // fse.outputFileSync(file, data);
  fs.outputFile(file, data)
    .then(() => fs.readFile(file, 'utf8'))
    .then(data => {
      console.log(
        `create new page ${name} sucessfully! Go to edit file page-${name}.html`
      );
    })
    .catch(err => {
      console.error(err)
    })
};
