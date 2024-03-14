import { Request, Response } from "express";
import { isEmpty } from "lodash";

import { createCarSchema, updateCarSchema } from "../config/validation";
import Car from "../models/car";
import { handleErrorFromYup } from "../utils/commons";

const getCar = async (_: Request, res: Response) => {
  try {
    const cars = await Car.findAll();
    return res.status(200).json({
      status: "success",
      message: "Cars retrieved successfully",
      data: cars,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findByPk(req.params.id);

    if (isEmpty(car)) {
      return res.status(404).json({
        status: "error",
        message: "Car not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Car retrieved successfully",
      data: car,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createCar = async (req: Request, res: Response) => {
  try {
    await createCarSchema.validate(req.body, { abortEarly: false });
    await Car.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "Car created successfully",
    });
  } catch (error: any) {
    const generatedError = handleErrorFromYup(error);
    return res.status(500).json(generatedError);
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    await updateCarSchema.validate(req.body, { abortEarly: false });
    const car = await Car.findByPk(req.params.id);

    if (isEmpty(car)) {
      return res.status(404).json({
        status: "error",
        message: "Car not found",
      });
    }

    await car.update(req.body);

    return res.status(200).json({
      status: "success",
      message: "Car updated successfully",
      data: car,
    });
  } catch (error: any) {
    const generatedError = handleErrorFromYup(error);
    return res.status(500).json(generatedError);
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.findByPk(req.params.id);

    if (isEmpty(car)) {
      return res.status(404).json({
        status: "error",
        message: "Car not found",
      });
    }

    await car.destroy();

    return res.status(200).json({
      status: "success",
      message: "Car deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getCar,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
