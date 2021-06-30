'use strict'

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { Users } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');

// construct a router instance
const router = express.Router();

// router that returns a list of users
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  let user = await req.currentUser;
  res.json(user);
}));

// router that creates a new user
router.post('/users', asyncHandler(async (req, res) => {
    try {
        await Users.create(req.body);
        res.location('/');
        res.status(201).json({ "message": "Account successfully created" });
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });   
        } else {
          throw error;
        }
    }
}));

module.exports = router;