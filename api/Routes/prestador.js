/* API REST dos prestadores */
import express, { Router } from 'express'
import { connectToDatabase } from '../Utils/mongodb.js'
import {check, validationResult} from 'express-validation'

const router = express.Router()
const {db, ObjectId} = await connectToDatabase()
const nomeCollection = 'prestadores'

const validaPrestador = [
    check('cnpj')
    .not().isEmpty().trim().withMessage('Informe o CNPJ')
    .isNumeric().withMessage('o CPNJ deve conter números')
    .isLengh({min:14, max:14}).withMessage('O CPNJ deve conter 14 nºs')


    .check('razao_social')
    .not().isEmpty().trim().withMessage('informe a razão')
    .isAlphanumeric('pt-BR', {ignore:'/.'}).withMessage("A Razão social não deve")
    .isLengh({min:5}).withMessage('Razão é muito curta Mínimo 5')
    .isLength({max:200}).withMessage('A Razão é muito longe. Maximo 200')
]

/**
 * GET /api/prestadores
 * Lista todos os prestadores de serviço
 */
router.get('/', async(req, res) => {
    try{
        db.collection(nomeCollection).find().sort({razao_social: 1}).toArray((err, docs) => {
            if(!err){
                res.status(200).json(docs)
            }
        })
    } catch (err) {
        res.status(500).json({
            errors: [{
                value: `${err.message}`,
                msg: 'Erro ao obter a listagem dos prestadores',
                param: '/'
            }]
        })
    }
})

/**
 * GET /api/prestadores/id/:id
 * Lista todos os prestadores de serviço
 */
router.get('/id/:id', async(req, res)=> {
    try{
        db.collection(nomeCollection).find({'_id': {$eq: ObjectId(req.params.id)}})
        .toArray((err, docs) => {
            if(err){
                res.status(400).json(err) // bad request
            } else {
                res.status(200).json(docs) // retorna o documento
            }
        })
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
})

router.delete('/:id', async(req, res) => {

await db.collection (nomeCollection)
.deleteOne({"_id": {$eq: ObjectId(req.perams.id)}})
.then(result => res.status(200).send(result))
.catch(err =>res.status(400).json(err))

})

export default router