const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Geography API",
        description: "This API is intended to retrieve data about locations around the world for educational purposes.",
    },
    host: "localhost:8080",
    schemes: ["http", "https"], 
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);