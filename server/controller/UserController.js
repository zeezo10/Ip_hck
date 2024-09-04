const { comparePassword } = require("../helper/bcrypt");
const { signToken  } = require("../helper/jwt");
const { User } = require("../models");



const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

class UserController {


  static async googleAouth(req,res,next){
    try {

      const {googleToken} = req.body 

      // console.log(googleToken)

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          provider: 'google',
          password: 'google_id'
        },
        hooks: false
      });
  
      const token = signToken({ id: user.id }, process.env.JWT_SECRET);
      res.status(created ? 201 : 200).json({ access_token: token });
    } catch (error) {
      
      
      res.status(500).json({ message: 'Internal server error' });
    }
  }

//----------- REGISTER ------------------------

  static async registerUser(req, res ,next) {
    try {
      
        const {name , email , password} =req.body
        
      let user = await User.create({
        name : name,
        email : email,
        password : password
      });
        
        res.status(201).json({name,email})      
    } catch (error) {
        next(error)
    }
  }

//----------- LOGIN ------------------------

  static async loginUser(req,res,next){
    try {
        const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailIsRequired" };
      }
      if (!password) {
        throw { name: "PasswordIsRequied" };
      }

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw { name: "InvalidEmailOrePassword" };
        
      }

      const isPasswordValid = comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw { name: "InvalidEmailOrPassword" };
        
      }

      const accessToken = signToken({ id: user.id });
      
      res.status(200).json({access_token: accessToken});
    } catch (error) {
        next(error)
        
    }
  }

  static async getUserById(req,res) {
    try {
        
        const {id} = req.params

        let data = await User.findByPk(id)

    res.send(data)        

    } catch (error) {
        console.log(error);
        
    }
  }

  static async ai(req,res){
    try {

        const{promp} = req.body


        async function run() {

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

            const prompt = `dont answer anything not about food or drinks ,and if the prompt not about food  just answer "i dont understand" .${promp} , and the answer should be in format title: ingredients: without any decoraion `
          
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            res.send(text);
          }
          
          run();
    } catch (error) {
        console.log(error);
        
    }
  }
}

module.exports = UserController;
