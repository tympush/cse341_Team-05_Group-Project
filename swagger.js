const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Geography API",
        description: "This API is intended to retrieve data about locations around the world for educational purposes.",
    },
    host: "cse341-team-05-group-project.onrender.com",
    schemes: ["https"], 
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);