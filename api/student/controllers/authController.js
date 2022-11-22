const jwt = require('jsonwebtoken');

const authController = {

    admin: function (req, res, next){
        const token = req.params.token;
        if(!token){
            res.status(401).send('Access Denied');
        }else{
            try{
                const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
                req.userVerified = userVerified;
                if(req.userVerified.admin){
                    next();
                }else{
                    res.status(401).send('Access Denied. Insufficient Privileges.');
                }
            }
            catch{
                res.render('deniedOrExpired')
            }
        }
    },

    free: function (req, res, next){
        const token = req.params.token;
        if(!token){
            res.status(401).send('Access Denied');
        }else{
            try{
                const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
                req.userVerified = userVerified;
                next();
            }
            catch{
                res.render('deniedOrExpired')
            }
        }
    }

}



module.exports = authController;



