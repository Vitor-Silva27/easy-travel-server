import { Router } from 'express';

import agencyRoutes from './AgencyRoutes';
import tripRoutes from './TripRoutes';
import userRoutes from './UserRoutes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

// trip routes
routes.use(tripRoutes);

// agency routes
routes.use(agencyRoutes);

// user routes
routes.use(userRoutes);

export default routes;
