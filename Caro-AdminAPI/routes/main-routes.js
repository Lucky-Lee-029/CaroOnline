const router = require('express').Router();

router.post("/login", async(req,res)=>{
    const {email, password}=req.body;
    if(email==="loi" && password=="123456"){
        res.sendStatus(200);
        return;
    }else{
        res.sendStatus(201);
        return;
    }
})

module.exports= router;