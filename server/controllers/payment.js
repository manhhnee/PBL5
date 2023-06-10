// const bookSupplierModel = require("../models/book_supplier");
const paypal = require("../config/paypal/index");
require("dotenv").config();
class paymentController {
  getConfig(req, res) {
    return res.status(200).json({
      status: "OK",
      data: process.env.CLIENT_ID,
    });
  }

  createPayment(req, res, next) {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5000/api/order/success",
        cancel_url: "http://localhost:5000/api/order/canceled",
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "50.00",
          },
          description: "Washing Bar soap",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  }
  executePayment(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
    };

    // Obtains the transaction details from paypal
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
        if (error) {
          console.log(error.response);
          res.json({ success: false, message: "thanh toán thất bại" });
        } else {
          res.json("thanh toan thanh cong");
        }
      }
    );
  }
}
module.exports = new paymentController();
