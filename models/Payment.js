import mongoose, { model, Schema } from "mongoose";

const paymentSchema = new Schema({

    name: { type: String, required : true },
    to_user: { type: String, required : true },
    amount: { type: Number, required : true },
    message: { type: String },
    oid: { type: String, required : true },
    // here try with default : false 
    isDone: { type: Boolean, default :false },
}, { timestamps: true ,collection : 'payment' })
//                                      👆 this is the collection name in db 
 

//                                                      👇 this is the collection name locally in your file
export default mongoose.models.payment || model('payment',paymentSchema)


// my mongo db the collection name would be payment only not PaymentNew