import { Hono } from "hono";
import { cors } from "hono/cors";
import secure from "./secure";

const app = new Hono();

app.use(cors());

app.route("/secure", secure);

export default app;
