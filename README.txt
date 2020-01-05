                                            Moodcafe Assignmnet:
                                    
Created RESTful API for bookStore in which user can view list of books available in bookStore. Used Mongodb for
data storage and JWT for authentication. Followings are the list of API

There are two type of profiles Admin and user profile. 
--> Admin is allowed to add book to bookStore , get list of books and purchase book.
--> User is only allowed to get list of book and purchase the book from store.


1) Register user API:

"Method": "POST"  
"Url":  "http://localhost:3000/user/register"
"Header":   "Content-Type": "application/json"
"body":  {
    "email": "test.1234@gmail.com",
    "password": "test@1234",
    "isAdmin": "true",
    "name": "xyz joy"
}

Note: If admin then we need to provide isAdmin = true else not neccesary to provide.

Corner Case Handled:
If user is registered with an email then he/she can't register again.


2) Login user API:

"Method": "POST"  
"Url":  "http://localhost:3000/user/login"
"Header":   "Content-Type": "application/json"
"body":  {
    "email": "test.1234@gmail.com",
    "password": "test@1234"
}


3) Get all book in bookStore API:

"Method": "GET"  
"Url":  "http://localhost:3000/bookStore/listBooks"
"Header":  { 
    "Content-Type": "application/json"
    "x-access-token" : jwt token received after login
}


4) Add book to bookStore API:(only admin is allowed to add the book)

"Method": "POST"  
"Url":  "http://localhost:3000/bookStore/addBook"
"Header":  { 
    "Content-Type": "application/json"
    "x-access-token" : jwt token received after login
}
"body":  {
    title: book_title,
    description: book_description,
    price: book_price,
    author: book_author,
    year: book_year
}

5) Purchase book from bookStore API:

"Method": "POST"  
"Url":  "http://localhost:3000/purchase/byBookTitle"
"Header":  { 
    "Content-Type": "application/json"
    "x-access-token" : jwt token received after login
}
"body" : {
      "bookTitle": book_title
}