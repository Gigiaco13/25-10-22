//configuração de servidor
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
//ativar a renderização json/ejs
app.use(express.json())
app.set('view engine','ejs')

//multer
const multer = require('multer')
//storage (local de armazenamento)
const storage = multer.diskStorage ({
    //destino
    destination:(req,res,cb) => {
        cb(null,"uploads")

    },
    //filename
    filename:(req,file,cb) => {
        cb(null,file.originalname)

    }
})
const upload = multer ({storage})
//rota padrão
app.get('/', (req,res) => {
    res.render('index')
})

//post (recebimento via formulário)
//uso do multer (midleware)
app.post('/',upload.single('arquivo'), (req,res) => {
    res.send("OK")
    //log (apoio a lógica)
    console.log(req.body,req.file)
})

//escuta do servidor
app.listen(port, () =>{
    console.log('servidor escutando em http://localhost:${port}')
})