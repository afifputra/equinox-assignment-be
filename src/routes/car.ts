import { Router } from "express";
import CarController from "../controllers/car";

const router = Router();

router.get("/", CarController.getCar);

router.get("/:id", CarController.getCarById);

router.post("/", CarController.createCar);

router.put("/:id", CarController.updateCar);

router.delete("/:id", CarController.deleteCar);

export default router;
