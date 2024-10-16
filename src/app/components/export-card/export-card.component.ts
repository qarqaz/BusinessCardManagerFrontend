import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-export-card',
  templateUrl: './export-card.component.html',
  styleUrls: ['./export-card.component.css']
})
export class ExportCardComponent {
  selectedFormat: string = '1';

  constructor(
    public dialogRef: MatDialogRef<ExportCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cardId: number }
  ) { }


  onExport(): void {
    this.dialogRef.close(this.selectedFormat);
  }


  onCancel(): void {
    this.dialogRef.close(null);
  }
}
