
const css = fs.readFileSync(
    path.resolve(__dirname,'../views/style.css'), 
    { encoding: 'utf8' }
)

for(const name of ['home','login']){
    module.exports[name] = fs.readFileSync(
        path.resolve(__dirname,`../views/${name}.html`), 
        { encoding: 'utf8' }
    ).replace('<Styles/>',`<style>${css}</style>`)
}