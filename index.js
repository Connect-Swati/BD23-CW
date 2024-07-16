/*
notes from lectures and for selft study =>> two types of defining GET APIs

The two types of defining GET APIs represent different ways of passing parameters in the URL. They are useful in different scenarios and have different implications for how we access and use the parameters in  code.

1. Path Parameters 
Definition: http://localhost:3000/products/category/:category
API Call Example: http://localhost:3000/products/category/Electronics
Usage:
In this approach, category is a part of the URL path. This method is often used when the parameter is a key part of the resource being requested.

Express.js Implementation:
app.get('/products/category/:category', (req, res) => {
    const category = req.params.category;
    // Use the category to filter products
    res.send(`Products in the ${category} category`);
});
Key Points:

Parameters are embedded directly in the URL path.
Useful for cleaner, more readable URLs.
Accessed in Express.js using req.params.
--------------------------------------------------------------------------------------------------
2. Query Parameters
Definition: http://localhost:3000/products/category
API Call Example: http://localhost:3000/products/category?category=Electronics
Usage:
In this approach, category is passed as a query parameter. This method is typically used when you might have multiple optional parameters or when the parameters are not strictly part of the resource identity.

Express.js Implementation:
app.get('/products/category', (req, res) => {
    const category = req.query.category;
    // Use the category to filter products
    res.send(`Products in the ${category} category`);
});

Key Points:

Parameters are appended to the URL as key-value pairs.
More flexible, can handle multiple parameters easily.
Accessed in Express.js using req.query.
----------------------------------------------------------------------------------------------------------------

Choosing Between Them:
Path Parameters: Use when the parameter is integral to the resource being accessed. For example, accessing a specific product category or user profile.
Query Parameters: Use when you have optional parameters, filters, or multiple criteria that modify the request. For example, searching products with multiple filters like category, price range, and brand.

In summary, both approaches are useful in different contexts. Path parameters are cleaner and more intuitive for essential parameters, while query parameters offer greater flexibility for optional and multiple parameters.
*/

let express = require("express");
let app = express();
let port = 3000;
app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});

// this is array of objects
let productsArray = [
  { name: "Laptop", price: 50000, category: "Electronics" },
  { name: "Mobile", price: 20000, category: "Electronics" },
  { name: "Shirt", price: 1500, category: "Apparel" },
  { name: "Mixer Grinder", price: 4000, category: "Home Appliances" },
];

let carsArray = [
  { make: "Maruti", model: "Swift", mileage: 15000 },
  { make: "Hyundai", model: "i20", mileage: 25000 },
  { make: "Tata", model: "Nexon", mileage: 30000 },
];

let moviesArray = [
  { title: "3 Idiots", genre: "Comedy", rating: 9 },
  { title: "Dangal", genre: "Drama", rating: 10 },
  { title: "Bahubali", genre: "Action", rating: 8 },
];
let ordersArray = [
  { orderId: 1, customerName: "Rahul", status: "shipped" },
  { orderId: 2, customerName: "Sita", status: "pending" },
  { orderId: 3, customerName: "Amit", status: "shipped" },
];

/**
 *
 * Question 1: Filter Products by Category

Define the function filterByCategory to return only the products in a specific category from an array of products.
Declare a GET endpoint /products/category/:category to use the filterByCategory function.
Declare a variable category to take the input from query parameters
API Call: http://localhost:3000/products/category/Electronics*/

function filterByCategory(eachProductObj, categorySpecifiedInReq) {
  if (eachProductObj.category === categorySpecifiedInReq) {
    return true;
  } else {
    return false;
  }
}
//products/category/Electronics,  here specifiedCategory = Electronics

app.get("/products/category/:specifiedCategory", (req, res) => {
  let specifiedCategory = req.params.specifiedCategory; // for path parameter this is the way to call
  let filteredProductsArray = productsArray.filter((eachProductObj) =>
    filterByCategory(eachProductObj, specifiedCategory),
  );
  res.json(filteredProductsArray);
});

/*
Question 2: Filter Cars by Mileage

Define the function filterByMileage to return only the cars with mileage less than a specified value from an array of cars.

Declare a GET endpoint /cars/mileage/:maxMileage to use the filterByMileage function.

Declare a variable maxMileage to take the input from query parameters
*/
function filterByMileage(eachCarObj, maxMileage_specified) {
  return eachCarObj.mileage < maxMileage_specified;
}

app.get("/cars/mileage/:maxMileage", (req, res) => {
  let maxMileage_specified = parseFloat(req.params.maxMileage);
  let filteredCarsArray = carsArray.filter((eachCarObj) =>
    filterByMileage(eachCarObj, maxMileage_specified),
  );
  res.json(filteredCarsArray);
});

/*
Question 3: Filter Movies by Rating

Define the function filterByRating to return only the movies with a rating higher than a specified value from an array of movies.

Declare a GET endpoint /movies/rating/:minRating to use the filterByRating function.

Declare a variable minRating to take the input from query parameters
*/
function filterByRating(eachMovieObj, minRating_specified) {
  return eachMovieObj.rating > minRating_specified;
}
app.get("/movies/rating/:minRating", (req, res) => {
  let minRating_specified = parseFloat(req.params.minRating);
  let filterdMoviesArray = moviesArray.filter((eachMovieObj) =>
    filterByRating(eachMovieObj, minRating_specified),
  );
  res.json(filterdMoviesArray);
});

/*
Question 4: Filter Orders by Status

Define the function filterByStatus to return only the orders with a specific status from an array of orders.

Declare a GET endpoint /orders/status/:status to use the filterByStatus function.

Declare a variable status to take the input from query parameters
*/
function filterByStatus(eachOrderObj, status_specified) {
  return eachOrderObj.status === status_specified;
}
app.get("/orders/status/:status", (req, res) => {
  let status_specified = req.params.status;
  let filteredOrdersArray = ordersArray.filter((eachOrderObj) =>
    filterByStatus(eachOrderObj, status_specified),
  );
  res.json(filteredOrdersArray);
});
