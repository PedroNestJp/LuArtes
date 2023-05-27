const express = require("express");
const app = express();
const cors = require("cors");
const firebase = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: true }));
app.use(express.json());

firebase.initializeApp({
    credential: firebase.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
})
const db = firebase.firestore()

app.post("/api/checkout", async (req, res) => {
    const { cartItems, total } = req.body;
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/confirmation`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    await db.collection("orders").add({
      cartItems,
      total,
      sessionId: session.id,
      createdAt: firebase.firestore.Timestamp.now(),
    });
  
    res.json({ sessionId: session.id });
  });
  
  
