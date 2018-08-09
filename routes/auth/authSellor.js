var router=require('express').Router();
var sellorSchema= require('../../model/sellor');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var config = { secret: 'my secret'}
router.post('/register',function (req,res) {

    console.log(req.body);

    var hashedPassword=bcrypt.hashSync(req.body.password,8);

    newUser = new sellorSchema(
        {
            name:req.body.sellorName,
            username:req.body.username,
            password:hashedPassword,
            phoneNumber:req.body.phoneNumber


        }

    )
    console.log('newUser from body:',newUser);
    newUser.save(function (err,usernew) {
        if (err)
        {
            if(err.message.indexOf('duplicate')> -1)
            {
                res.json({'userNotCreated':true,'duplicateUsername': true});
            }
            else
            {
                res.json({"error" : true});

            }

        }

        else
        {
            //lets create a auth token
            var token=jwt.sign({id:usernew._id},config.secret,{expiresIn:86400})  //86400 , means token will expire in 1 day
            console.log('newUser:' ,usernew);
            res.status(200).send({auth:true,token:token});
        }
    })
})



router.post('/login', function(req, res) {
    console.log('login access requested by:', req.body.username);
    sellorSchema.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');


        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });


        res.status(200).send({ auth: true, token: token });
    });
});
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports=router;