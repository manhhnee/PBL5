const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "sandbox", // 'sandbox' để kiểm tra hoặc 'live' để triển khai thực tế
  client_id:
    "AQ_w1dR_0xJj-tYWIXmCsLKulaYJlr3GvQk3zv88z1NkBbIXDnnYoXpQvw2NaBIRRZl9hi8-EmQsU4JN",
  client_secret:
    "EFxGwJyrS0JV5pqTELDz0JyDM0Z9r_N2ZxOANF56MJpQt_hsFJzUTSp-I5D_NoMJ2BST1TpA1Q5dOT0z",
});
module.exports = paypal;
