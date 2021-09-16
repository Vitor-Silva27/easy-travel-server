import { Router } from 'express';

import agencyController from '../app/Agency/controller/AgencyController';

const agencyRoutes = Router();

agencyRoutes.post('/agencies', agencyController.create);
agencyRoutes.get('/agencies', agencyController.findAllAgencies);

export default agencyRoutes;
