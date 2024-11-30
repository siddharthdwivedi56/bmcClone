const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const {validationErr} = require('../helper');

exports.register = async (req,res)=>{
    try{
        /** checking the requested email is alredy in databse or not */
        const userExist = await userModel.findOne({"email":req.body.email});
        if(userExist){
            res.status(400).json({
                success : false,
                message : "Email already exist",
                errors: [req.body.email+' already registered with us']

            });
        }

        /** Hashing the password before store in database*/
        req.body.password = await bcrypt.hashSync(req.body.password,10);

        let user = new userModel(req.body);
        const userSave = await user.save();
        res.status(201).json({
            success : true,
            message : "Registration successfull",
            data : userSave
        });

    }catch(error){
        validationErr(error,res);
    }
}

exports.login = async (req,res)=>{
    try{
        /** checking the requested email is alredy in databse or not */
        const userExist = await userModel.findOne({"email":req.body.email});
        if(userExist){
            const isPasswordMatched =  bcrypt.compareSync(req.body.password,userExist.password);
            if(isPasswordMatched){
                res.status(200).json({
                    success : true,
                    message : "login successfull",
                    data : userExist
                });
            }else{
                res.status(400).json({
                    success : false,
                    message : "Invalid password",
                    errors: ['Password is not matching']
                });
            }
        }else{
            res.status(400).json({
                success : false,
                message : "Invalid email address",
                errors: [req.body.email+' does not registered with us']
            });
        }
    }catch(error){
        validationErr(error,res);
    }
}