const express = require('express')
const hbs =  require('hbs')
const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:false}))

hbs.registerHelper('ptag', (num, words)=>{
    var str = ''
    for(let i=0; i < num; i++)
    {
        str+='<p>'
        str+=words
        str+='</p>'
    }
    
    return new hbs.handlebars.SafeString(str)
})

function rando(req, res, next)
{
    req.num = Math.round(Math.random()*25)
    next()
}

app.use(rando)

app.get('/', (req, res)=>{
    res.render('index', {name:"brandon's"})
})

const port = process.env.PORT || 80

app.listen(port, ()=>{
    console.log('Server is running at localhost:3000')
})
