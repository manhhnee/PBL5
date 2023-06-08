const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const route = require("./routes/index");
const bodyParser = require("body-parser");
const http = require("http"); // Thêm dòng này
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.use(cookie_parser());
socketIo.on("connection", (socket) => {
  socket.emit("getId", socket.id);

  socket.on("message", (message) => {
    const suggestions = [
      "Đặt hàng",
      "Thanh toán",
      "Hỗ trợ khách hàng",
      "Kết thúc",
    ];
    if (message.text === "Bắt đầu") {
      const replyMessage = "Chào mừng bạn đến với chatbot. Bạn muốn gì?";
      socket.emit("message", {
        text: replyMessage,
        sender: "chatbot",
        suggestions,
      });
    } else if (message.text === "Đặt hàng") {
      // Xử lý logic cho lựa chọn "Đặt hàng" từ người dùng
      const replyMessage = "Bạn có thể đặt hàng bằng cách:";
      const replyMessage1 = 'Chọn sách bạn muốn đặt và bấm "Thêm vào giỏ hàng"';
      socket.emit("message", {
        text: replyMessage + "\n" + replyMessage1,
        sender: "chatbot",
        suggestions,
      });
    } else if (message.text === "Thanh toán") {
      // Xử lý logic cho lựa chọn "Thanh toán" từ người dùng
      const replyMessage = "Bạn có thể thanh toán bằng cách:";
      const replyMessage1 = 'Chọn sách bạn muốn mua và bấm vào "Mua Ngay"';
      const replyMessage2 =
        'Hoặc vào giỏ hàng và bấm "Thanh toán" sách bạn muốn mua';
      socket.emit("message", {
        text: replyMessage + "\n" + replyMessage1 + "\n" + replyMessage2,
        sender: "chatbot",
        suggestions,
      });
    } else if (message.text === "Hỗ trợ khách hàng") {
      // Xử lý logic cho lựa chọn "Hỗ trợ khách hàng" từ người dùng
      const replyMessage = "Chúng tôi ở đây để giúp bạn. Bạn cần hỗ trợ gì?";
      socket.emit("message", {
        text: replyMessage,
        sender: "chatbot",
        suggestions: [
          "Đặt hàng",
          "Thanh toán",
          "Chính sách giao hàng",
        ],
      });
    } else if (message.text === "Kết thúc") {
      const replyMessage =
        "Cảm ơn bạn đã sử dụng dịch vụ. Chúc bạn một ngày tốt lành!";
      socket.emit("message", {
        text: replyMessage,
        sender: "chatbot",
        suggestions: [],
      });
    } else {
      const replyMessage =
        "Xin lỗi, tôi không hiểu. Vui lòng chọn từ các lựa chọn có sẵn.";
      socket.emit("message", {
        text: replyMessage,
        sender: "chatbot",
        suggestions: [
          "Đặt hàng",
          "Thanh toán",
          "Hỗ trợ khách hàng",
          "Kết thúc",
        ],
      });
    }
  });

  socket.on("disconnect", () => {});
});

route(app);
server.listen(port, () => console.log(`run at port http://localhost:${port}`));
