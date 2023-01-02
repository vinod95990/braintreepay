const express = require("express");
const router = express.Router();
const braintree = require("braintree");

router.post("/", (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: "6rdmz22zhd53gpjn",
    publicKey: "rwh4q9szn9thykr8",
    privateKey: "c12899f55c665af3bbfa3bcd593bfb49",
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  console.log(JSON.stringify(req.body));
  const newTransaction = gateway.transaction.sale(
    {
      amount: req.body.paymentAmt,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
    }
  );
});

module.exports = router;
