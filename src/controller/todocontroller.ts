import {
  controller,
  httpGet,
  httpHead,
  httpPost,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TodoService, Todo } from "../services/task";
import { Request } from "express";
import Types from "../types/types";

@controller("/todos")
export class TodoController {
  constructor(@inject(Types.TodoService) private todoService: TodoService) {}

  @httpGet("/")
  public getTodos(): Todo[] {
    return this.todoService.getTodos();
  }
  @httpGet("/:id")
  public getTodoById(req: Request): Todo | undefined {
    return this.todoService.getTodo(req.params.id);
  }

  @httpPost("/")
  public addTodo(req: Request): { message: string } {
    return this.todoService.addTodo(req.body);
  }
  @httpPut("/:id")
  public updateTodo(req: Request): Todo | { message: string } {
    return this.todoService.updateTodo(req.params.id, req.body);
  }
  @httpDelete("/:id")
  public deleteTodo(req: Request): { message: string } {
    return this.todoService.deleteTodo(req.params.id);
  }
}
