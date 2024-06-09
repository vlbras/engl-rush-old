export class UserExistsQuery {
  public constructor(public readonly input: UserExistsQueryInput) {}
}

type UserExistsQueryInput = {
  id: string;
};
