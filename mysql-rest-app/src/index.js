import express  from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import prospectsRoutes from './route/prospets.route.js';
import otpRoutes from './route/otp.route.js';
import logger from './util/logger.js';
import HttpStatus from './controller/prospect.controller.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin : '*'}));
app.use(express.json());
app.use('/prospects',prospectsRoutes)
app.use('/otpservices',otpRoutes)
app.get('/', (req,res) => res.send(new Response(HttpStatus.OK.code,HttpStatus.OK.status,'Prospect API, V1.0.0 - All Systems GO')));
app.get('*', (req,res) => res.send(new Response(HttpStatus.NOT_FOUND.code,HttpStatus.NOT_FOUND.status,'Route does not exists')));

//console.log(process.env)
app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}: ${PORT}`));
