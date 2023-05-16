require('dotenv').config()
const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const app=express()
const Phone=require('./mongo')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('id', function getId (req) {
    if(req.method==='POST'){
        return JSON.stringify(req.body)
    }
  
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms:id'))
app.get('/persons',(req,res)=>{
    Phone.find({}).then(result=>{
        res.status(200).json(result)
    })
})
app.get('/persons/:id',(req,res,next)=>{
    Phone.findById(req.params.id).then(result=>{
        res.status(200).json(result)
    }).catch(error=>next(error))
})
app.delete('/persons/:id',(req,res)=>{
    Phone.findByIdAndDelete(req.params.id)
    Phone.find({}).then(result=>{
        res.status(200).json(result)
    })
    
})
app.post('/persons',(req,res)=>{
    const {name,number}=req.body
    if(!name|!number){
        return res.status(404).json({error:'name/number missing'})
    }

    const newphone = new Phone({
        name: name,
        number: number,
    })

    newphone.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
    })
    Phone.find({}).then(result=>{
        res.json(result)
    })

})
const errorhandler=(error,req,res,next)=>{
    console.error(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorhandler)
app.listen(3001,()=>{console.log('LISTENING TO PORT 3001')})