# FileFolderUpload

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## About Project

This project aims to provide a hands-on feature to assign data files to employees and keep track of the files by monitoring 
the files status. This project include main 3 role modules listed as Employees , Admin and Client .Employees can update the file status according to their working on the files assigned to them.
Admin can update the file status back to the employees and also can update the files as completed and get those completed files 
delivered to the client. Client using their credentials can login and reached the final state for the files by approving the completed files. then this file gets closed. Overall file activty can be monitored using dashboard.

Folowing are the credentials for diffreebt modules:

Employee Portal: email: 'employee@ml.com' password: 'ml@infomap',
Admin Portal:    email: 'admin@ml.com'    password: 'ml@infomap',
Client Portal:   email: 'client@ml.com'   password: 'ml@infomap'

The charting library used in this project are Chart.js and AgCharts. 5 process progress charts are implemented rendering dynamic data/
