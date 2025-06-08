"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_username, payment_form) => {
  await connectDB();
  let user = await User.findOne({ username: to_username })
  const { razorpaySecret } = user;
  const { razorpayID } = user;
  var instance = new Razorpay({
    key_id: razorpayID,
    key_secret: razorpaySecret,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  // create a payment object which shows a pending payment in the database

  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: payment_form.name,
    message: payment_form.message,
    isDone: false,
  });

  return x;
};

export const fetchPyaments = async to_user => {
  await connectDB();

  let x = await Payment.find({ isDone: true, to_user: to_user });

  const data = JSON.parse(JSON.stringify(x));

  return data;
};

export const fetchUser = async username => {
  await connectDB();
  let u = await User.findOne({ username: username });


  return JSON.parse(JSON.stringify(u))
};


export const updateProfile = async (data, oldUsername) => {

  await connectDB()




  let newData = Object.fromEntries(data)


  // if the username is being updated check if the username already exists 
  if (oldUsername !== newData.username) {
    // now check that particular username does not exist in db, to maintain consistency 
    let u = await User.findOne({ username: newData.username })


    if (u) {
      return { error: 'Username already exists ' }
    }
    // update everything except email 
    await User.updateOne({ email: newData.email }, newData)

    await Payment.updateMany({ to_user: oldUsername }, { to_user: newData.username })
  }
  else{
   // update everything except email 
    await User.updateOne({ email: newData.email }, newData)
  }
  return { message: 'Profile updated !!!' }
}

