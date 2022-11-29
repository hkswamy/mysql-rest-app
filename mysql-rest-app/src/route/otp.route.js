import express  from "express";
import { createOtprecord } from "../controller/otp.controller.js";
const otpRoutes = express.Router()

otpRoutes.route('/')
    .post(createOtprecord);
    
    export default otpRoutes;