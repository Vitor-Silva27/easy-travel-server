import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

import TripController from '../app/Trip/controller/TripController';

const upload = multer(multerConfig);

const tripRoutes = Router();

tripRoutes.post('/trips', TripController.create);
tripRoutes.post('/trip/images', upload.single('image'), TripController.addImage);
tripRoutes.get('/trips', TripController.findAllTrips);
export default tripRoutes;
