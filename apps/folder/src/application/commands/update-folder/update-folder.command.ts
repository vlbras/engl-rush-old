export class UpdateFolderCommand {
  public constructor(public readonly input: UpdateFolderCommandInput) {}
}

type UpdateFolderCommandInput = {
  id: string;
  name?: string;
  userId?: string;
};
