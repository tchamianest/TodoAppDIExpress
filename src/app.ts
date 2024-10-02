import "reflect-metadata";
import { Container } from "inversify";
import express from "express";
import { TodoService } from "./services/task.js";
import { InversifyExpressServer } from "inversify-express-utils";
import Types from "./types/types.js";
import { TodoController } from "./controller/todocontroller.js";

const container = new Container();
container.bind<TodoService>(Types.TodoService).to(TodoService);
container.bind<TodoController>(TodoController).toSelf();

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

server.setErrorConfig((app) => {
  app.get("/", (req, res) => {
    res.send("Hey you, I'm here...");
  });

  app.use((req, res, next) => {
    res.status(404).send("Route not found");
  });
});

const app = server.build();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
