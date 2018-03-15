import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadStatus } from '../../utils/load-status';
import { BudgetFile } from '../models/budget-file.model';

@Component({
  selector: 'file-list',
  templateUrl: 'file-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  @Input() public status: LoadStatus;
  @Input() public files: BudgetFile[] = [];
  @Input() public loadError: string;
  @Output() public fileSelected = new EventEmitter<BudgetFile>();
  @Output() public fileDeleted = new EventEmitter<BudgetFile>();
}
