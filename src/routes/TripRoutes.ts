import { Router } from 'express';

import TripController from '../app/Trip/controller/TripController';

const tripRoutes = Router();

tripRoutes.post('/trips', TripController.create);

export default tripRoutes;
