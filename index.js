let data=[
    {
      "name": "test1",
      "number": "",
      "id": 2
    },
    {
      "name": "new",
      "number": "",
      "id": 3
    }
]
const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
morgan.token('id', function getId (req) {
    if(req.method==='POST'){
        return JSON.stringify(req.body)
    }
  
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms:id'))
app.get('/persons',(req,res)=>{
    res.json(data)
})
app.get('/persons/:id',(req,res)=>{
    const id=Number(req.params.id)
    const found=data.find(phone=>phone.id===id)
    if(found){
        res.json(found)
    }
    else{
        return res.status(404).send()
    }
})
app.delete('/persons/:id',(req,res)=>{
    const id=Number(req.params.id)
    data=data.filter(phone=>phone.id!==id)
    res.status(200).json(data)
    
})
app.post('/persons',(req,res)=>{
    const {name,number}=req.body
    if(!name|!number){
        return res.status(404).json({error:'name/number missing'})
    }
    const samenumber=data.find(person=>person.name===name)
    if(samenumber){
        return res.status(404).json({error:'unique name is needed'})
    }
    data=[...data,{id:Math.floor(Math.random() * 100),name:name,number:number}]
    res.status(200).json(data)

})
app.listen(3001,()=>{console.log('LISTENING TO PORT 3001')})