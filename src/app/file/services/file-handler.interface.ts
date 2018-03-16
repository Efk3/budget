import { Observable } from 'rxjs/Observable';
import { BudgetFile } from '../models/budget-file.model';

export interface FileHandler {
  ready: Observable<boolean>;

  list();

  get(file: BudgetFile);

  create(name: string);

  remove(file: BudgetFile);

  rename(file: BudgetFile, newName: string);

  save(file: BudgetFile, newContent: string);
}
