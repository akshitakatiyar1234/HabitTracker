import express from 'express';
import habitController from './habit.controller.js';

const habitcontroller = new habitController();
const habitRoutes =express.Router();

habitRoutes.post('/addhabit/:userId',habitcontroller.addHabit);
habitRoutes.get('/allhabit/:userId',habitcontroller.allHabit);
habitRoutes.delete('/deletehabit/:userId',habitcontroller.deleteHabit);


export default habitRoutes;