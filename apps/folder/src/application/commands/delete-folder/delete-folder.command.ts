export class DeleteFolderCommand {
  public constructor(public readonly input: DeleteFolderCommandInput) {}
}

type DeleteFolderCommandInput = {
  id: string;
};
