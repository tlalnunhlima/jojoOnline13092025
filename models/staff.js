const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

var uniqueValidator = require('mongoose-unique-validator')

const staffSchema = new Schema({
    
    username: {
        
       type: String,
       
       required: [true, 'Please provide name'],
       
       unique: true
       
    },
    
    password: {
        
        type: String,
        
        required: [true, 'Please provide password']
        
    },
    
    adminIdentity: {
        
       type: String
       
    },
    
    myDashboard: [{
       
       type: String
        
    }],
    
    hrefLink: [{
       
       type: String
        
    }],
     
    datePosted: {
        
        type: Date,
        
        default: Date.now
        
    }
    
});

//duplicate checker
staffSchema.plugin(uniqueValidator);


//password hash
staffSchema.pre('save', async function(next){
    
  try {
      
      const hashedPassword = await bcrypt.hash(this.password, 10)
        
        this.password = hashedPassword
        
        next()
        
  } catch(error) {
      
      next(error)
  }
  
})

//export model
const staff = mongoose.model('staff', staffSchema)

module.exports = staff