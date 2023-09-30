import mongoose, { Document, model, Model, Schema } from "mongoose";
import { getCongig } from "@/libs/config/dbInit";

export interface Iitem extends Document {
  itemType: String;
  alternativeName: String;
  form: String;
  itemCategory: String;
  itemName: String;
  presetQuantity: String;
  price: Number;
  productDescription: String;
  unitOfMeasure: String;
}

const itemSchema = new Schema(
  {
    type: {
      type: String,
      validate: {
        validator: async (v: string) =>
          getCongig()?.typeConfig?.itemTypes?.includes(v),

        message: "path `{PATH}` invalid enum value {VALUE}",
      },
      required: [true, "Please Enter Item Type"],
    },
    name: {
      type: String,
      required: [true, "Please Enter Item Name"],
    },
    altName: {
      type: String,
      // required: [true, "Please select alternative Name"],
    },
    codeName: {
      type: String,
      // required: [true, "Please Enter Item Name"],
    },
    category: {
      type: [{ type: Schema.Types.ObjectId, ref: "category" }],

      // required: [true, "Please item Category"],
      // maxLength: [60, "item category name cannot exceed 60 characters"],
    },
    qty: {
      type: Number,
      // required: [true, "Please item form type"],
      // maxLength: [60, "Form type cannot exceed 60 characters"],
    },
    prefQty: [{ type: Number }],

    monthQty: {
      type: Number,
      // required: [true, "Please select alternative Name"],
    },
    form: {
      type: String,
      // required: [true, "Please item form type"],
      // maxLength: [60, "Form type cannot exceed 60 characters"],
    },
    dispanseForm: {
      type: String,
      // required: [true, "Please item form type"],
      // maxLength: [60, "Form type cannot exceed 60 characters"],
    },
    costPrice: { //clculate 
      type: Number,
      // required: [true, "Please Enter Price"],
    },
    unitPrice: {
      type: String,
      // required: [true, "Please select alternative Name"],
    },
    sellingPrice: { //clculate
      type: Number,
      // required: [true, "Please Enter Price"],
    },
    menufecturePrice: { //calculate
      type: Number,
      // required: [true, "Please select alternative Name"],
    },
    retailPrice: {
      type: Number,
      // required: [true, "Please select alternative Name"],
    },
    savings: { //savings
      type: Number,
      // required: [true, "Please select alternative Name"],
    },
    strength: {
      type: String,
      // required: [true, "Please item form type"],
      // maxLength: [60, "Form type cannot exceed 60 characters"],
    },
    measureUnit: {
      type: String,
      // required: [true, "Please enter unit Of Measure"],
      // maxLength: [60, "unit Of Measure cannot exceed 60 characters"],
    },
    description: {
      type: String,
      // required: [true, "Please Enter Item Description"],
      // maxLength: [60, "Item Description cannot exceed 60 characters"],
    },
    deleteAt: {
      type: Date,
      default: undefined,
      // required: [true, "Please enter unit Of Measure"],
      // maxLength: [60, "unit Of Measure cannot exceed 60 characters"],
    },
    totalCount: {
      type: Number,
      required: [true, "Please enter totalCount"],
    },
    medicineImages: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.item ||
  model("item", itemSchema)) as Model<Iitem>;