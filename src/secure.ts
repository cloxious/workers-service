import { Hono } from "hono";
import { ALPHANUMERIC, DIGITS, generateRandomString } from "./util/random";

const app = new Hono();

app.get("/code", (c) => {
  const data = generateRandomString(6, DIGITS);
  return c.json({ data });
});

app.get("/password", (c) => {
  const data = generateRandomString(8, ALPHANUMERIC);
  return c.json({ data });
});

export default app;
