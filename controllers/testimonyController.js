const testimonials = require("../models/testimonyModel")


// add testimonials
exports.addTestimonyController =async (req,res)=>{
    console.log("inside addTestimonyController");
    const {name,email,message} = req.body
    try{
        const newTestimony = new testimonials({name,email,message})
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
    
}


// get all testimonials
exports.getAllTestimonyController =async (req,res)=>{
    console.log("inside getAllTestimonyController");
    try{
        const allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
}

// status update testimonial
exports.updateTestimonyStatusController =async (req,res)=>{
    console.log("inside updateTestimonyStatusController");
    const {id} = req.params
    const status = req.query.status
    try{
        const existingTestimony  = await testimonials.findById({_id:id})
        existingTestimony.status = status
        await existingTestimony.save()
        res.status(200).json(existingTestimony)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all approved testimonial - not authorized
exports.getApprovedTestimonyController =async (req,res)=>{
    console.log("inside getApprovedTestimonyController");
    try{
        const approvedTestimony  = await testimonials.find({status:"Approved"})
        res.status(200).json(approvedTestimony)
    }catch(err){
        res.status(401).json(err)
    }
}