import express from "express";

const app = express()

const port = 4000

app.use(express.json()) // faser parse de arquivos JSON 

app.use('/', express.static('public'))

app.get('/api', (req, res) => {

    res.status(200).json({
        message: 'API Fatec 100% funcional',
        version: '1.0.0'
    })

})

app.listen(port, function(){
    console.log(`servidor rodando na porta  ${port}`)
})

app.use(function (req, res)
{
    res.status(404).json({

        errors: [{
            value: `${req.originalUrl} `,
            msg: `A rota ${red.originalUrl} não existe ou não foi encontrado nesta API`,
            param: 'Invalid Route'
        }]

    })
    
})