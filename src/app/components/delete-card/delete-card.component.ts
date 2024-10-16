import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cardId: number }
  ) { }


  onDelete(): void {
    this.dialogRef.close(true);
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }
}
