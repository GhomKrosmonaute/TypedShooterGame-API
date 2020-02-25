
const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(
    path.resolve(__dirname,'../views/style.css'), 
    { encoding: 'utf8' }
)

const routes = require('./routes.json')

for(const name of ['home','login']){
    module.exports[name] = fs.readFileSync(
        path.resolve(__dirname,`../views/${name}.html`), 
        { encoding: 'utf8' }
    )
        .replace('<Styles/>',`<style>${css}</style>`)
        .replace('<Routes/>',`
            <table>${Object.keys(routes).map( route => {
                const [ method, path ] = route.split(/\s+/)
                return `<tr><td>${method}</td><td>${path}</td></tr>`
            }).join('')}</table>
        `)
}