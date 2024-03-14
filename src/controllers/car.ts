import { Request, Response } from "express";
import Car from "../models/car";
import { isEmpty } from "lodash";

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
    await Car.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "Car created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
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
    res.status(500).json({ message: error.message });
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
