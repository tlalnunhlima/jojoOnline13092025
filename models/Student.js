const mongoose = require('mongoose')

const Schema = mongoose.Schema

var uniqueValidator = require('mongoose-unique-validator')




const UserSchema = new Schema({
    
        admissionYear: {
        
        type: String,
        
        required: [true, 'Please provide year'],
        
        index: true   // 👈 speeds up queries on this field
        
    },
    
    regn: {
        
        type: Number,
        
        required: [true, 'Please provide regn no'],
        
        unique: true  // 👈 automatically indexed as unique
        
    },
    
    studentIdentity: {
        
       type: String
       
    },
    
    username: {
        
       type: String,
       
       required: [true, 'Please provide name']
       
    },
    
    fname: {
        
        type: String,
        
        required: [true, 'Please provide Father name']
        
    },
    
     mName: {
        
        type: String,
        
        required: [true, 'Please provide Mother name']
        
    },
    
    address: {
        
        type: String,
        
        required: [true, 'Please provide address']
        
    },
    
    phone: {
        
    type: String,
    required: [true, 'Please provide phone'],
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    
        
    },

    emailId: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },

    
    aadharNo: {
        
        type: String
        
    },
    
    batchSession: {
        
        type: String,
        
        index: true   // 👈 same for batch filtering

    },
    
    gender: {
      
        type: String  
        
    },
    
    dob: {
        
        type: String,
        
        required: [true, 'Please provide DOB']
        
    },
   
    staffid: {
        
        type: Schema.Types.ObjectId,
        
        ref: 'staff',
        
        required: true
        
    },
    
    myDashboard: [{
       
       type: String
        
    }],
    
    hrefLink: [{
       
       type: String
        
    }],
    
   studentFee: [
       
       {
       
       narrationInput: String,
       
       feeAmount: Number,
       
       dateofpayment: Date,
       
       dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    },
       
       verifierId: {
        
        type: Schema.Types.ObjectId,
        
        ref: 'staff',
        
        required: true
        
    }
       
   }],
   
   studentExamFee: [
       
       {
       
       narrationInput: String,
       
       feeAmount: Number,
       
       dateofpayment: Date,
       
       dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    },
       
       verifierId: {
        
        type: Schema.Types.ObjectId,
        
        ref: 'staff',
        
        required: true
        
    }
       
   }],
   
   
   studentOtherFee: [
       
       {
       
       narrationInput: String,
       
       feeAmount: Number,
       
       dateofpayment: Date,
       
       remarks: String,
       
       dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    },
       
       verifierId: {
        
        type: Schema.Types.ObjectId,
        
        ref: 'staff',
        
        required: true
        
    }
       
   }],
   
   
   totalCourseFee: {
       
       type: Number,
       
       required: true
      
       
   },
   
   feeDiscount: {
       
       type: Number,
       
       required: true
      
       
   },
   
   feeAfterDiscount: {
       
       type: Number,
       
       required: true
       
   },
   
   assignmentTheory: [
       
       {
           
        subjectName: String,
        
        chapterName: String,
       
        mcq1: String,
       
        mcq2: String,
       
        mcq3: String,
       
        mcq4: String,
       
        mcq5: String,
        
        Scored: String,
        
        totalMark: String,
       
        dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    }
       
   }],
   
   assignmentTheory102: [
       
       {
           
        subjectName: String,
        
        chapterName: String,
       
        mcq1: String,
       
        mcq2: String,
       
        mcq3: String,
       
        mcq4: String,
       
        mcq5: String,
        
        Scored: String,
        
        totalMark: String,
       
        dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    }
       
   }],
   
   assignmentTheory103: [
       
       {
           
        subjectName: String,
        
        chapterName: String,
       
        mcq1: String,
       
        mcq2: String,
       
        mcq3: String,
       
        mcq4: String,
       
        mcq5: String,
        
        Scored: String,
        
        totalMark: String,
       
        dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    }
       
   }],
   
   assignmentTheory104: [
       
       {
           
        subjectName: String,
        
        chapterName: String,
       
        mcq1: String,
       
        mcq2: String,
       
        mcq3: String,
       
        mcq4: String,
       
        mcq5: String,
        
        Scored: String,
        
        totalMark: String,
       
        dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    }
       
   }],
   
   assignmentTheory105: [
       
       {
           
        subjectName: String,
        
        chapterName: String,
       
        mcq1: String,
       
        mcq2: String,
       
        mcq3: String,
       
        mcq4: String,
       
        mcq5: String,
        
        Scored: String,
        
        totalMark: String,
       
        dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    }
       
   }],
   
   assignmentTheory106: [
       
       {
           
        subjectName: String,
        
        chapterName: String,
       
        mcq1: String,
       
        mcq2: String,
       
        mcq3: String,
       
        mcq4: String,
       
        mcq5: String,
        
        Scored: String,
        
        totalMark: String,
       
        dateSubmitted: {
        
        type: Date,
        
        default: Date.now
        
    }
       
   }],
    
    
    datePosted: {
        
        type: Date,
        
        default: Date.now
        
    }
    
});

// in Student schema
UserSchema.index({ batchSession: 1, regn: -1 });

UserSchema.index({ 'assignmentTheory.dateSubmitted': 1 });
UserSchema.index({ 'assignmentTheory102.dateSubmitted': 1 });
UserSchema.index({ 'assignmentTheory103.dateSubmitted': 1 });
UserSchema.index({ 'assignmentTheory104.dateSubmitted': 1 });
UserSchema.index({ 'assignmentTheory105.dateSubmitted': 1 });
UserSchema.index({ 'assignmentTheory106.dateSubmitted': 1 });

//search awlsam nan aw:: Example: speed up regex and sort by regn
UserSchema.index({ username: 1 });
UserSchema.index({ fname: 1 });
UserSchema.index({ address: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ username: 'text', fname: 'text', address: 'text' });



//duplicate checker
UserSchema.plugin(uniqueValidator);


//export model

const Student = mongoose.model('Student', UserSchema)

module.exports = Student