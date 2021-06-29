'use strict'

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { Users ,Courses } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');

// construct a router instance
const router = express.Router();

// router that returns a list of courses
router.get('/courses', asyncHandler(async (req, res) => {
    let courses = await Courses.findAll();
    res.json(courses);
}));

// router that will return the corresponding course
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Courses.findByPk(courseId);
    if(course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found!' });
    }
}));

// router that creates a new course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    let {
        title,
        description,
        estimatedTime,
        materialsNeeded,
    } = req.body;
    try {
        await Courses.create({
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: user.userId,
        });
        // res.location(`/courses/`);
        res.status(201).json({ "message": "Course successfully created" });
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });   
        } else {
          throw error;
        }
    }
}));

// router that updates the corresponding course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const courseId = req.params.id;
    let {
        title,
        description,
        estimatedTime,
        materialsNeeded,
    } = req.body;
    try {
        const course = await Courses.findByPk(courseId);
        if (user.id === course.userId) {
            await course.update({
                title,
                description,
                estimatedTime,
                materialsNeeded,
            });
            res.status(204).json({ message: "Course successfully updated" });
        } else {
            res.status(403).json({
                message: "This course is not yours"
            });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });   
        } else {
          throw error;
        }
    }
}));

// router that deletes the corresponding course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const courseId = req.params.id;
    try {
        const course = await Courses.findByPk(courseId);
        if (user.id === course.userId) {
            await course.destroy();
            res.status(204).json({ "message": "Course successfully deleted" });
        } else {
            res.status(403).json({
                status: 'Unauthorized',
                message: 'Course is not yours',
            });
        }
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