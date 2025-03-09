import { createServer } from "@mswjs/http-middleware";
import { handlers } from "./handlers.js";

export const server = createServer(...handlers);
