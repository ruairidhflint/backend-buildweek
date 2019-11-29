# Dad Jokes API by Ruairidh Flint (Backend Buildweek)

*Version: 1.0.0*

A simple backend for the Dad Jokes  project. Featuring a sign up and log in system using industry standard encrypting and hashing as well as JSON Web Tokens for authentication. 

This documentation references the Postgres Hosting that will persist data. If you are using the development server locally, replace the URL with localhost:8000

## List of Routes

- **GET** - Retrive All Users 

  > https://rflint-backend-buildweek.herokuapp.com/users
  >
  > Provides a list of the Users (email and ID).
  >
  > Requires no authetication. This route is temporary and for development only.

- **POST** - Sign Up New User

  > https://rflint-backend-buildweek.herokuapp.com/users/signup
  > Signs up new user with username and password. 
  >
  > The format of the body of the request must look like:
  >
  > ```json
  > {
  > "username": "example",
  > "password": "example1234",
  > }
  > ```
  >
  > All fields are required. If the username is already in use, an error will occur. 

- **POST** - Log In Existing User 

  > https://rflint-backend-buildweek.herokuapp.com/users/login
  > Logs in existing user using username and password. 
  > The format of the body of the request must look like:
  >
  > ```json
  > {
  > "username": "test",
  > "password": "1234"
  > }
  > ```
  >
  > Server is validate credentials if all fields are present and password matches. On a successful login in, the server will return the following data:
  >
  > ```json
  > {
  > "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJUZXN0IiwiaWF0IjoxNTY5NDA4NDg0LCJleHAiOjE1Njk0OTQ4ODR9.c6GFy9J-FgB2XW69Z9ftHCO6GyEL5KoM5NERtL8MdE4",
  > 
  > "username": "test",
  > 
  > "id": 1
  > }
  > ```
  >
  > A JSON Web Token used for future authentication, the user's username at point of sign up and the user's ID. This can all be stored in local storage or elsewhere for future authentication. 
  >
  > The token is valid for 24 hours from point of log in.

  ​	

**DELETE** - Delete User Account by ID

> https://rflint-backend-buildweek.herokuapp.com/users/:id
> Deletes user where  `:id` is the user ID wanted for deletion.
> The token **must** be set as an *authorization* header on the request. 
> The server will then verify the ID contained in the token of the logged in user matches that of the requested deletion, ensuring that only the user themselves can delete the account. 

------

**GET**  - Retrieve All Public Jokes 

> https://rflint-backend-buildweek.herokuapp.com/jokes/public
>
> Provides a list of all jokes across all users that are set to public. 
>
> Requires no authetication.

**GET**  - Retrieve All  Jokes 

> https://rflint-backend-buildweek.herokuapp.com/jokes/all
>
> Provides a list of all jokes across all users, private and public. 
>
> Requires a valid authentication token be provided in the header of the request.

**GET** - Retrieve Specific User Jokes 

> https://rflint-backend-buildweek.herokuapp.com/jokes/user
>
> This is a protected route.
>
> For the request to be a success, there must be a valid token present in the *authorization* header. The server will decode the token and use the included ID to send back the correct set of jokes corresponding to the User ID. 
>
> The jokes will come back in array:
>
> ```json
> [
    {
        "id": 1,
        "joke_q": "Why did the chicken cross the road?",
        "joke_a": "To get to the other side!",
        "privated": false,
        "user_id": 1
    },
    {
        "id": 2,
        "joke_q": "How do you get a squirrel to like you?",
        "joke_a": "Act a nut",
        "privated": true,
        "user_id": 1
    },
    {
        "id": 3,
        "joke_q": "Why can't a nose be 12 inches long?",
        "joke_a": "Because it would be a foot!",
        "privated": false,
        "user_id": 1
    }
]
> ```
>
> If there are currentlly no jokes saved to that user's account, the response will return:
>
> ```json
> {
> "message": "No Jokes Found!"
> }
> ```

**POST** - Post New Joke to User Account

> https://rflint-backend-buildweek.herokuapp.com/jokes/new-joke
>
> This is a protected route. The prerequisite user ID will be added by the server. 
>
> There are two hard requirements. 
>
> 1. A valid token must be set as an *authorization* header. 
> 2. The body must contain a joke_q, joke_a and private field.
>    The body response will look like:
>
> ```json
> {
>  "joke_q": "Why can't a nose be 12 inches long?",
>  "joke_a": "Because it would be a foot!",
>  "privated": 0
> }
> ```
>
> If the post is successful, the response will be the created item as well as a success message. 

**DELETE** - Delete Joke by ID

> https://rflint-backend-buildweek.herokuapp.com/jokes/joke/:id
>
> This is a protected route.
>
> The parameter `:id` refers to the ID of the joke to be deleted.
> A valid token must be set as an *authorization* header. If there is no token present or it does not match the associated User ID of the joke itself, deletion will be denied. 
> If the currently logged in User's ID matches that of the associated user ID of the joke, the deletion will be successful.

**PUT** - Edit Joke by ID

> https://rflint-backend-buildweek.herokuapp.com/jokes/joke/:id
>
> This is a protected route.
>
> The parameter `:id` refers to the ID of the joke to be edited.
>
> Similarly to the deletion route, the authorization of the edit is based of the user ID of the joke matching the User ID contained within the token provided to the authorization header. 
> If the match, an edit can taken place.
>
> Furthermore, the request body will have to contain the full updated item, much like a post request: 
>
> ```json
>> {
>  "joke_q": "Why can't a nose be 12 inches long?",
>  "joke_a": "Because it would be a foot!",
>  "privated": 0
> }
> ```



