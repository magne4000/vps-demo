import { authjsHandler, authjsSessionMiddleware } from "./authjs-handler";
import { dbMiddleware } from "./db-middleware";
import { createTodoHandler } from "./create-todo-handler";
import vike from "@vikejs/hono";
import { Hono } from "hono";

function getApp() {
  const app = new Hono();

  vike(app, [
    // Make database available in Context as `context.db`
    dbMiddleware,

    // Append Auth.js session to context
    authjsSessionMiddleware,

    // Auth.js route. See https://authjs.dev/getting-started/installation
    authjsHandler,

    createTodoHandler,
  ]);

  return app;
}

export const app = getApp();
