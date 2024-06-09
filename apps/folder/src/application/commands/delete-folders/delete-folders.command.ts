export class DeleteFoldersCommand {
  public constructor(public readonly input: DeleteFoldersCommandInput) {}
}

type DeleteFoldersCommandInput = {
  userId: string;
};
