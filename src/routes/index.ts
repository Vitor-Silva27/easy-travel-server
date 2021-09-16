import { Router } from 'express';

import agencyRoutes from './AgencyRoutes';
import tripRoutes from './TripRoutes';
import userRoutes from './UserRoutes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

// user routes
routes.use(userRoutes);

// agency routes
routes.use(agencyRoutes);

// trip routes
routes.use(tripRoutes);

export default routes;
