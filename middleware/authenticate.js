import jwt from 'jsonwebtoken';
import Contact from '../src/controllers/crmController'

export const authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY); 

        const rootUser = await Contact.findOne({ _id: verifyToken._id, "tokens.token": token });

        if(!rootUser) { throw new Error('User not Found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(e){
        res.status(401).send('Unauthorized:No token provided');
        console.log(e);
    }
}