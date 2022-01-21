This is a simple C.R.U.D with pagination using [Angular](https://angular.io/) as front-end, [SpringBoot](https://spring.io/) RestFul API as back-end and [MySql](https://www.mysql.com/) as Data Base.
# Getting Started
First, install the dependencies on Angular project folder:

```bash
ng add @angular/material
npm install --save ngx-mask
npm install ng-lazyload-image
```

Run the development server:

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser to see the page.

Execute the "db_cliente_script.sql" in a server MySql to build the BD.
For execute the SpringBoot application, use the JDK 11. 

## Learn More

To learn more about the libraries used in building the front-end, take a look at the following resources:

-[Angular Material Documentation](https://material.angular.io/guide/getting-started) - Learn about the components used. 

-[Mask](https://www.npmjs.com/package/ngx-mask) -  mask used some inputs and outputs

-[Lazy Load Image](https://www.npmjs.com/package/ng-lazyload-image) - load images from a endpoint
