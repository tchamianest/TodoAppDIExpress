import { injectable } from "inversify";

export interface Todo {
  id: string | number;
  name: string;
  description: string;
}

@injectable()
export class TodoService {
  private todostore: Todo[] = [
    {
      id: 1,
      name: "task1",
      description: "task1 description",
    },
    {
      id: 2,
      name: "task2",
      description: "task2 description",
    },
  ];

  public getTodos(): Todo[] {
    return this.todostore;
  }

  public getTodo(id: string | number): Todo | undefined {
    return this.todostore.find((todo) => todo.id === Number(id));
  }

  public addTodo(todo: Todo): { message: string } {
    this.todostore.push(todo);
    return { message: "Todo added" };
  }

  public updateTodo(
    id: number | string,
    todo: { name: string; description: string }
  ): Todo | { message: string } {
    const index = this.todostore.findIndex((todo) => todo.id === Number(id));
    if (index !== -1) {
      this.todostore[index] = { id: Number(id), ...todo };
      return { id: id, ...todo };
    }
    return { message: "Todo not found" };
  }

  public deleteTodo(id: string | number): { message: string } {
    const index = this.todostore.findIndex((todo) => todo.id === Number(id));
    if (index !== -1) {
      this.todostore.splice(index, 1);
      return { message: "Todo deleted" };
    }
    return { message: "Todo not found" };
  }
}
