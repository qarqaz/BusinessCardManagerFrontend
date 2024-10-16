# Business Card Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16, and Node version 18.12.0.
The Business Card Manager allows users to manage business cards, including adding, viewing, deleting, exporting and importing business cards.

## Features

- **Add new business cards.**
- **View a list of all business cards.**
- **Delete business cards with confirmation pop-up.**
- **Export business cards in CSV or XML format.**
- **Import business card data via CSV or XML file.**
- **Add new business cards.**

## Development server

Run **ng serve** for a development server. Navigate to **http://localhost:4200/**. The application will automatically reload if you change any of the source files.

## Project Structure

- **app**: Contains the components, services, and modules for the application.
- **components**: All the UI components like adding and viewing business cards.
- **services**: Services for communicating with the backend API.

## API Integration

The frontend connects to the backend API at: http://localhost:44304/api/businesscard

- **GET**: /api/businesscard: Fetch all business cards.
- **POST**: /api/businesscard/create: Add a new business card.
- **DELETE**: /api/businesscard/{id}: Delete a business card by ID.
- **GET**: /api/businesscard/export/{id}/{format}: Export a business card in CSV or XML format.

## Further help

To get more help on the Angular CLI, use **ng help** or visit the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Sample Screenshots

### Home Screen
![Home Screen](https://github.com/qarqaz/BusinessCardManagerFrontend/blob/StableReleaseV1/src/assets/Home.png)

### Create & Import Business Cards
![Create & Import Business Cards](https://github.com/qarqaz/BusinessCardManagerFrontend/blob/StableReleaseV1/src/assets/CreateImport.png)

### Show & Export Business Cards
![Show & Export Business Cards](https://github.com/qarqaz/BusinessCardManagerFrontend/blob/StableReleaseV1/src/assets/ShowExport.png)


