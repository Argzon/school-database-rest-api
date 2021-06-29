'use strict'

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { Courses } = require('../models');

// construct a router instance
const router = express.Router();

// router that returns a list of courses
router.get('/courses', asyncHandler(async (req, res) => {
    let courses = await Courses.findAll();
    res.json(courses);
}));

// router that will return the corresponding course
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Courses.findByPk(req.params.id);
    if(course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found!' });
    }
}));

// router that creates a new course
router.post('/courses', asyncHandler(async (req, res) => {
    let {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId,
    } = req.body;
    try {
        await Courses.create({
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
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
router.put('/courses/:id', asyncHandler(async (req, res) => {
    let {
        title,
        description,
        estimatedTime,
        materialsNeeded,
    } = req.body;
    try {
        const course = await Courses.findByPk(req.params.id);
        await course.update({
            title,
            description,
            estimatedTime,
            materialsNeeded,
        });
        res.status(204).json({ "message": "Course successfully updated" });
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
router.delete('/courses/:id', asyncHandler(async (req, res) => {
    try {
        await Courses.destroy({where: {id: req.params.id}});
        res.status(204).json({ "message": "Course successfully deleted" });
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