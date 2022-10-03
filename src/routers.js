import express from "express";
import Alternative from "./models/Alternative.js";
import User from "./models/User.js";
import Question from "./models/Question.js";
import SendMail from './services/SendMail.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { isAuthenticated } from "./middleware/auth.js";

const routers = express.Router();

// TODO
routers.get('/questions', async (req, res) => {
  const questions = await Question.readAll();

  for (const question of questions) {
      const alternatives = await Alternative.readAllbyQuestion(question.id);
      question.alternatives = alternatives;
  }

  res.json(questions);
})

routers.post('/users', async (req, res) => {
  try {
    const user = req.body;
    
    const newUser = await User.create(user);
    await SendMail.createNewUser(user.email);


    
    res.json(newUser);
  } catch(error) {
    throw new Error('Error in create user');
  }
});
routers.post('/users', async (req, res) => {
  try {
    const user = req.body;
    
    const newUser = await User.create(user);


    
    res.json(newUser);
  } catch(error) {
    throw new Error('Error in create user');
  }
});

routers.get('/finishGame', isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.read(userId);
    
    await SendMail.finishGame(user.email);

    res.json({message: 'Jogo Finalizado'});
  } catch(error) {
    throw new Error('Error in create user');
  }
});

routers.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.readByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const { id: userId, password: hash } = user;

    const match = await bcrypt.compareSync(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.SECRET,
        { expiresIn: 3600 } // 1h
      );

      res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch(error) {
    res.status(401).json({ error: 'User not found' });
  }
});

routers.use(function(req, res, next) {
  res.status(404).json({
    message: 'Content not found'
  });
});

routers.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something broke!'
  });
});

export default routers;