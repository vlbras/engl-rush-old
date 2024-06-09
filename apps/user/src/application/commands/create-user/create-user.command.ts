export class CreateUserCommand {
  public constructor(public readonly input: CreateUserCommandInput) {}
}

export type CreateUserCommandInput = {
  email: string;
};
