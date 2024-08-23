import express from 'express';
import todayController from './today.controller.js';

const todaycontroller = new todayController();
const todayRoutes = express.Router();

todayRoutes.post('/addhabit/:userId',todaycontroller.addHabit);
todayRoutes.get('/allhabit/:userId',todaycontroller.allHabit);
todayRoutes.put('/updatehabit/:userId',todaycontroller.updateHabit);
todayRoutes.delete('/deletehabit/:userId',todaycontroller.deleteHabit);

export default todayRoutes;