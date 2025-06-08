import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import { fetchUser } from "@/actions/useractions";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()


    body = Object.fromEntries(body)

    // check if Razorpay order id present on the  server 
    let checkUser = await Payment.findOne({ oid: body.razorpay_order_id })


    if (!checkUser) {

        return NextResponse.json({ error: 'order id not found', status: 404, success: false })
    }

    let user = await User.findOne({ username: checkUser.to_user })
    const { razorpaySecret } = user;



    // verify the payment   
    let isPaymentDone = validatePaymentVerification({ 'order_id': body.razorpay_order_id, 'payment_id': body.razorpay_payment_id }, body.razorpay_signature, razorpaySecret)



    if (isPaymentDone) {
        // update the payment status 

        const updatePayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { isDone: true }, { new: true })

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/users/${updatePayment.to_user}?payment-done=true`)
    }
    else {
        return NextResponse.json({ error: 'Payment verification failed !!!', status: 500, success: false })
    }
}