import { Hono } from "hono";
import { validator } from "hono/validator";

const app = new Hono();

app.get(
  "/code",
  validator("query", (value, c) => {
    const { length } = value;

    if (length === undefined || length === "") {
      return { length: 6 };
    }

    if (Array.isArray(length)) {
      return c.json({ error: "Length must be a single numeric value" }, 400);
    }

    const parse = Number(length);

    if (!Number.isInteger(parse) || String(length).trim() === "") {
      return c.json({ error: "Length must be a valid integer" }, 400);
    }

    if (parse < 1 || parse > 12) {
      return c.json({ error: "Length must be between 1 and 12" }, 400);
    }

    return { length: parse };
  }),
  (c) => {
    const { length } = c.req.valid("query");

    let data = "";
    const buffer = new Uint8Array(1);

    while (data.length < length) {
      crypto.getRandomValues(buffer);

      if (buffer[0] < 250) {
        data += (buffer[0] % 10).toString();
      }
    }

    return c.json({ data });
  },
);

export default app;
