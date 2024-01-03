const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUI = require("swagger-ui-express");

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/* Routes import */
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const clientRoutes = require("./routes/client");
const tableRoutes = require("./routes/table");
const orderRoutes = require("./routes/order");
const uploadRoutes = require("./routes/upload");

/* Swagger configuration */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "City Point Restaurant",
      version: "1.0.0",
    },
    servers: [
      {
        api: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// const swaggerSpec = swaggerJSDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/* Handling CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const rootPath = path.resolve();

/* File folder */
app.use("/uploads", express.static(path.join(rootPath, "/uploads")));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(rootPath, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(rootPath, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

/* Error Handlers */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
