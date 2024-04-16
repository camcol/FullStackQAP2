const http = require("http");
const fs = require("fs");
const path = require("path");
const { EventEmitter } = require("events");

const server = http.createServer((request, response) => {
  const url = request.url;

  switch (url) {
    case "/":
      console.log("Home page requested");
      serveHTML("home.html", response);
      break;
    case "/about":
      console.log("About page requested");
      serveHTML("about.html", response);
      break;
    case "/contact":
      console.log("Contact page requested");
      serveHTML("contact.html", response);
      break;
    case "/products":
      console.log("Products page requested");
      serveHTML("products.html", response);
      break;
    case "/subscribe":
      console.log("Subscribe page requested");
      serveHTML("subscribe.html", response);
      break;
    default:
      console.log("Unknown page requested");
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 - Page not found");
  }

  myEmitter.emit("routeRequested", url);
});

const serveHTML = (fileName, response) => {
  const filePath = path.join(__dirname, "views", fileName);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.log(`Error reading file: ${error}`);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 - Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    }
  });

  myEmitter.emit("fileRead", fileName);
};

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on("routeRequested", (url) => {
  console.log(`Route requested: ${url}`);
});

myEmitter.on("fileRead", (fileName) => {
  console.log(`File read: ${fileName}`);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
