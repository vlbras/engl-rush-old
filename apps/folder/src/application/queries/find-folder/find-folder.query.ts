export class FindFolderQuery {
  public constructor(public readonly input: FindFolderQueryInput) {}
}

type FindFolderQueryInput = {
  id: string;
};
