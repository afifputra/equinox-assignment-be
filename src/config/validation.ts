import * as yup from "yup";

export const createCarSchema = yup.object().shape({
  car_name: yup.string().required(),
  day_rate: yup.number().required(),
  month_rate: yup.number().required(),
  image: yup.string().required(),
});

export const updateCarSchema = yup.object().shape({
  car_name: yup.string(),
  day_rate: yup.number(),
  month_rate: yup.number(),
  image: yup.string(),
});

export const createOrderSchema = yup.object().shape({
  car_id: yup.number().required(),
  order_date: yup.date().required(),
  pickup_date: yup.date().required(),
  dropoff_date: yup.date().required(),
  pickup_location: yup.string().required(),
  dropoff_location: yup.string().required(),
});

export const updateOrderSchema = yup.object().shape({
  car_id: yup.number(),
  order_date: yup.date(),
  pickup_date: yup.date(),
  dropoff_date: yup.date(),
  pickup_location: yup.string(),
  dropoff_location: yup.string(),
});
