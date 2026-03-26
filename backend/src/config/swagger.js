const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Manager API",

      version: "1.0.0",

      description: "RBAC Task Manager Backend API",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",

          scheme: "bearer",

          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // VERY IMPORTANT FOR RENDER

  apis: [path.join(__dirname, "../routes/*.js")],
};

module.exports = swaggerJsdoc(options);
