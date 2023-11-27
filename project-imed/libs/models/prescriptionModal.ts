import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IPropsType extends Document {
    name?: string;
    description?: string;
    isActive?: boolean;
    deletedAt?: any;
}

const prescriptionSchema = new Schema(
    {
        doctor: {
            type: Schema.Types.ObjectId,
            ref: "AdminUser",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        items: {
            type: [
                {
                    item: { type: Schema.Types.ObjectId, ref: "Item" },
                    qty: Number,
                    description: String,
                }
            ],
            _id: false
        },
        description: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.category ||
    model("category", prescriptionSchema)) as Model<IPropsType>;