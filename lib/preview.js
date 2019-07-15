const express = require('express');
const staticServe = require('serve-static');
const path = require('path');
const opn = require('opn');

module.exports = function(dir){
    dir = dir || '.';

    const app = express();
    app.set('view engine', 'html');
    
    app.use(express.static(path.join(process.cwd(), '')));
    
    var uri = 'http://localhost:3000';
    console.log('> Listening at ' + uri + '\n');
    opn(uri)

    app.listen('3000', ()=>{
        console.log(`the local blog server has been listened at localhost: 3000`)
    })
}