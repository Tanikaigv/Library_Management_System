# Library_Management_System

Server  >> Storing certain book data
        >> User Register
        >> Subscirber
    

This is a book record management API server/ Backend for the library system or management of records or books.

Fine System:
User: 06/03/2023 - 06/06/2023
if he is returning on -> 09/06/2023 => 50*3=150/-


## Subscription Types
3 months (Basic)
6 months (Standard)
12 months (Premium)

If the subscription type is standard && if the suscription date is 06/03/2023
+> then subscription valid till 06/09/2023

Within subscription date >> id we miss the renewal >> 50/- day
Subscription date is also been missed >> and also missed the renewal >> 100 + 50/- day


# Routes and Endpoints

## /users
>> POST: Create a new user 
>> GET: Getting the user informations.

## /users/{id}
>> GET: Get the user info by ID
>> PUT: Update a user by their ID
DELETE: Delete a user by id (check if he/she still have an issued book) && (is there any fine to paid)

## /users/subscription-details/{id}
GET: Get user subscription details
         >> Date of Subscription
         >> valid till
         >> Is there any fine

## /books
>> GET: Get all the books
>> POST: Create/Add a new book 

## /books/{id}
>> GET: Get a book by id
PUT: Update a book by id

## /books/issued
GET: Get all issued books

## /books/issued/withfine
GET: Get all the issued books with their fine.
