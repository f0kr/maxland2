import React, { useEffect, useState } from "react";
import { fetchAddress } from "../../services/getPosition";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNQ16eSykH3eHi_5MJtCNIPilAMbfGCPY",
  authDomain: "webe-53c5a.firebaseapp.com",
  projectId: "webe-53c5a",
  storageBucket: "webe-53c5a.appspot.com",
  messagingSenderId: "13097953053",
  appId: "1:13097953053:web:260fe7481f28bb9231a3f4",
  measurementId: "G-Q701Z18CEM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const CheckoutForm = () => {
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const { register, formState, handleSubmit, setValue, getValues } = useForm();
  const { errors } = formState;
  const items = cart.map((item) => ({
    id: item._id,
    quantity: item.quantity,
  }));
  let order = cart.map((item) => `${item.name}×${item.quantity}`).join(", ");

  useEffect(() => {
    // Initialize reCAPTCHA when the component mounts
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved - allow user to send OTP
          console.log("reCAPTCHA solved, OTP can be sent");
        },
      }
    );
  }, []);

  const sendOTP = async () => {
    const phoneNumber = getValues("phoneNumber");
    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+964${phoneNumber}`;
    console.log(formattedPhoneNumber);
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+9647811234566",
        appVerifier
      );

      setVerificationId(confirmationResult.verificationId);
      setIsVerifying(true);
      toast.success("The 6 digit code sent to your phone number");
    } catch (error) {
      console.error("Error during phone number verification:", error);
    }
  };
  useEffect(() => {
    console.log(isVerifying);
  }, [isVerifying]);
  const verifyOTP = async (otp) => {
    try {
      console.log(verificationId);
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      await auth.signInWithCredential(credential);
      alert("Phone number verified!");
      return true;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    }
  };

  const onSubmit = async (user) => {
    setIsProcessing(true);

    await sendOTP();

    if (isVerifying) {
      console.log("True");
      const otp = prompt("Enter the 6 digit code sent to your phone number");
      const isVerified = await verifyOTP(otp);
      if (!isVerified) {
        console.log("False");
        setIsProcessing(false);
        return;
      }
    }

    const res = await fetch("/users/createPurchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order,
        totalPrice,
        items,
        userInfo: user,
      }),
    });
    if (!res.ok) throw new Error("Failed creating purchase");
    toast.success("Order placed successfully!");
    setIsProcessing(false);
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    const { address } = await fetchAddress();
    W;
    setValue("address", address);
  };

  return (
    <div className="checkout-container">
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          </div>
        ))}
        <h3>Total: ₹{totalPrice}</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
        <h2>Customer Information</h2>
        <div className="customer-info">
          <div className="form-row">
            <label>
              First Name
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </label>
          </div>
          <div className="form-row">
            <label>
              Phone Number
              <input value="+964" disabled />
              <input
                type="number"
                id="phoneNumber"
                placeholder="7xxxxxxxxx"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  maxLength: 10,
                })}
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber.message}</span>
              )}
            </label>
          </div>
          <div className="form-row">
            <label>
              Address
              <input
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className="error">{errors.address.message}</span>
              )}
            </label>
            <button onClick={handleOnClick}>Get Address</button>
          </div>
        </div>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing…" : "Pay"}
        </button>
      </form>
      {/* Placeholder for reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default CheckoutForm;
