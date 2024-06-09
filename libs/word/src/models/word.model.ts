import { WordForms } from '../enums';

export class Word {
  public id: string;
  public word: string;
  public translation: string;
  public definition: string;
  public sentences: string[];
  public forms: WordForms[];
  public progress: number;
  public folderId: string;
  public userId: string;
}
