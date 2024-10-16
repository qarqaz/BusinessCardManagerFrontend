import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessCardService } from 'src/app/services/business-card.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  businessCardForm: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;
  uploadedFileName: string = '';
  isDragOver: boolean = false;
  photoError: string | null = null;
  businessCardError: string | null = null;
  showSuccessMessage: boolean = false;

  constructor(private fb: FormBuilder, private businessCardService: BusinessCardService, private router: Router) {
    this.businessCardForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      photo: [null]
    });
  }

  ngOnInit(): void { }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const maxSizeInBytes = 1048576;

      if (file.size > maxSizeInBytes) {
        this.photoError = 'Photo size exceeds 1MB. Please upload a smaller file.';
        event.target.value = '';
        return;
      }

      this.photoError = null;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = reader.result;
        this.businessCardForm.patchValue({ photo: this.photoPreview });
      };
      reader.readAsDataURL(file);
    } else {
      this.photoError = 'Invalid photo file type. Please upload an image.';
      event.target.value = '';
    }
  }

  onBusinessCardFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const supportedFileTypes = ['text/csv', 'application/xml', 'text/xml'];

      if (!supportedFileTypes.includes(file.type)) {
        this.businessCardError = 'Unsupported file type. Please upload a CSV or XML file.';
        event.target.value = '';
        return;
      }

      this.businessCardError = null;
      this.uploadedFileName = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = reader.result as string;
        if (file.type === 'text/csv') {
          this.processCSV(fileContent);
        } else if (file.type === 'application/xml' || file.type === 'text/xml') {
          this.processXML(fileContent);
        }
      };

      reader.readAsText(file);
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.onBusinessCardFileSelected({ target: { files } });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(): void {
    this.isDragOver = false;
  }

  processCSV(fileContent: string): void {
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',');
    const values = lines[1].split(',');

    const dateOfBirth = this.convertToISODate(values[headers.indexOf('Date of Birth')]);
    const gender = this.convertTextToGender(values[headers.indexOf('Gender')]);

    this.businessCardForm.patchValue({
      name: values[headers.indexOf('Name')],
      gender: gender,
      dateOfBirth: dateOfBirth,
      email: values[headers.indexOf('Email')],
      phone: values[headers.indexOf('Phone')],
      address: values[headers.indexOf('Address')],
    });

    const photoIndex = headers.indexOf('Photo');
    if (photoIndex !== -1 && values[photoIndex]) {
      this.photoPreview = "data:image/gif;base64," + values[photoIndex];
      this.businessCardForm.patchValue({ photo: this.photoPreview });
    } else {
      this.photoPreview = null;
      this.businessCardForm.patchValue({ photo: null });
    }
  }

  processXML(fileContent: string): void {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(fileContent, 'application/xml');

    const dateOfBirth = this.convertToISODate(xmlDoc.getElementsByTagName('DateOfBirth')[0]?.textContent || '');
    const genderText = xmlDoc.getElementsByTagName('Gender')[0]?.textContent || '';
    const genderValue = this.convertTextToGender(genderText);

    this.businessCardForm.patchValue({
      name: xmlDoc.getElementsByTagName('Name')[0]?.textContent || '',
      gender: genderValue,
      dateOfBirth: dateOfBirth,
      email: xmlDoc.getElementsByTagName('Email')[0]?.textContent || '',
      phone: xmlDoc.getElementsByTagName('Phone')[0]?.textContent || '',
      address: xmlDoc.getElementsByTagName('Address')[0]?.textContent || '',
    });

    const photoElement = xmlDoc.getElementsByTagName('Photo')[0];
    if (photoElement && photoElement.textContent) {
      this.photoPreview = photoElement.textContent;
      this.businessCardForm.patchValue({ photo: this.photoPreview });
    } else {
      this.photoPreview = null;
      this.businessCardForm.patchValue({ photo: null });
    }
  }

  convertToISODate(dateString: string): string | null {
    if (!dateString) {
      return null;
    }

    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
      const [month, day, year] = dateParts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    return dateString;
  }

  convertTextToGender(genderText: string): string {
    if (genderText === '1' || genderText.toLowerCase() === 'male') {
      return '1';
    } else if (genderText === '2' || genderText.toLowerCase() === 'female') {
      return '2';
    }
    return '';
  }

  navigateToCards(): void {
    this.router.navigate(['/show-business-cards']);
  }

  onSubmit(): void {
    if (this.businessCardForm.valid) {
      const formData = this.businessCardForm.value;
      formData.gender = formData.gender === '1';

      this.businessCardService.createBusinessCard(formData).subscribe({
        next: (response) => {
          console.log('Business card created successfully:', response);
          this.showSuccessMessage = true;

          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error creating business card:', error);
        }
      });
    }
  }
}
