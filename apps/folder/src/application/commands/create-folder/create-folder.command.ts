export class CreateFolderCommand {
  public constructor(public readonly input: CreateFolderCommandInput) {}
}

export type CreateFolderCommandInput = {
  name: string;
  userId: string;
};
