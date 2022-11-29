import express  from "express";
import { getProspects, createProspect, getProspect, updateProspect, deleteProspect } from "../controller/prospect.controller.js";
const prospectsRoutes = express.Router()

prospectsRoutes.route('/')
    .get(getProspects)
    .post(createProspect);

    prospectsRoutes.route('/:id')
    .get(getProspect)
    .put(updateProspect)
    .delete(deleteProspect)
    
export default prospectsRoutes;