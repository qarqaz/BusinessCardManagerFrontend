import { Component, OnInit } from '@angular/core';
import { BusinessCardService } from 'src/app/services/business-card.service';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ExportCardComponent } from '../export-card/export-card.component';

@Component({
  selector: 'app-business-card-list',
  templateUrl: './business-card-list.component.html',
  styleUrls: ['./business-card-list.component.css']
})
export class BusinessCardListComponent implements OnInit {
  businessCards: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  errorMessage: string = '';
  showErrorMessage: boolean = false;
  filter: any = {
    name: '',
    phone: '',
    email: ''
  };


  constructor(private businessCardService: BusinessCardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBusinessCards();
  }

  loadBusinessCards(): void {
    this.businessCardService.getAllBusinessCards().subscribe({
      next: (cards) => {
        this.businessCards = cards;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load business cards. Please try again.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteCardComponent, {
      width: '300px',
      data: { cardId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCard(id);
      }
    });
  }

  deleteCard(id: number): void {
    this.businessCardService.deleteBusinessCard(id).subscribe({
      next: () => {
        this.businessCards = this.businessCards.filter(card => card.id !== id);
      },
      error: (err) => {
        this.error = 'Failed to delete the business card. Please try again.';
      }
    });
  }


  openExportDialog(id: number): void {
    const dialogRef = this.dialog.open(ExportCardComponent, {
      width: '300px',
      data: { cardId: id }
    });

    dialogRef.afterClosed().subscribe(format => {
      if (format) {
        this.exportCard(id, format);
      }
    });
  }
  exportCard(id: number, format: string): void {
    this.businessCardService.exportBusinessCard(id, format).subscribe({
      next: (data) => {

        this.businessCardService.getBusinessCardById(id).subscribe({
          next: (businessCard) => {
            const fileType = format === '1' ? 'text/csv' : 'application/xml';
            const safeFileName = businessCard.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const fileName = format === '1'
              ? `${safeFileName}.csv`
              : `${safeFileName}.xml`;

            const blob = new Blob([data], { type: fileType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: (err) => {
            this.errorMessage = 'Failed to retrieve business card name. Please try again.';
            this.showErrorMessage = true;
            console.error('Failed to retrieve business card name:', err);


            setTimeout(() => {
              this.showErrorMessage = false;
            }, 5000);
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to export business card. Please try again.';
        this.showErrorMessage = true;
        console.error('Failed to export business card:', err);


        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    });
  }

  filteredBusinessCards(): any[] {
    return this.businessCards.filter(card => {
      return (
        (!this.filter.name || card.name.toLowerCase().includes(this.filter.name.toLowerCase())) &&
        (!this.filter.phone || card.phone.includes(this.filter.phone)) &&
        (!this.filter.email || card.email.toLowerCase().includes(this.filter.email.toLowerCase()))
      );
    });
  }
}