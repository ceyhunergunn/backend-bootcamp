import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
      allow: [{ userAgent: /PostmanRuntime/ }],
      skip: (req) => req.headers["x-internal-key"] === "12345",
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
