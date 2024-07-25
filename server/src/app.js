import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import path from "path";
// Declare variable
export const app = express();

// import { fileURLToPath } from "url";
// import { dirname } from "path";
// Config CORS with Express
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Set JSON limit
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

// Config cookies parser
app.use(cookieParser());

// Import router
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";

// Define routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Catch-all route for undefined routes
app.all('/api/*', (req, res) => {
	res
		.status(404)
		.json({ error: { code: '404', message: 'The page could not be found' } });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname, "../../client/dist")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
// });

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(helmet());
