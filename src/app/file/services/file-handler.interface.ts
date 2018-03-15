import { BudgetFile } from '../models/budget-file.model';

export interface FileHandler {
  list();

  get(file: BudgetFile);

  create(name: string);

  remove(file: BudgetFile);

  rename(file: BudgetFile, newName: string);

  save(file: BudgetFile, newContent: string);
}
