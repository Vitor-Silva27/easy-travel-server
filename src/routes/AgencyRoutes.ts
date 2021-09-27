import { Router } from 'express';

import agencyController from '../app/Agency/controller/AgencyController';
import auth from '../middleware/Authentication';

const agencyRoutes = Router();

agencyRoutes.post('/agencies', agencyController.create);

agencyRoutes.get('/agency/:agencyName', auth, agencyController.findOneAgency);
agencyRoutes.get('/agencies', agencyController.findAllAgencies);

agencyRoutes.delete('/agencies/:id', auth, agencyController.deleteAgency);

agencyRoutes.put('/agencies/:id', auth, agencyController.updateAgency);

agencyRoutes.post('/agencies/login', agencyController.authenticate);

export default agencyRoutes;
