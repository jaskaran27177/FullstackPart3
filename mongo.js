
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URI)

const PhoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})
PhoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports= mongoose.model('Phone', PhoneSchema)
// if(process.argv.length>3){
//     const note = new Phone({
//     name: name,
//     number: number,
//     })

//     note.save().then(result => {
//     console.log(`added ${name} number ${number} to phonebook`)
//     mongoose.connection.close()
//     })
// }
