# Planning App Backend
***
## What is this?
The `PlanningAppBackend` repository contains the application programming interface (API) for the planning app being developed by Ben Levy and Zachary Berkowitz.
This API is complementary to the frontend of the project, which is currently in development. By having the frontend of this application
call the API, we hope to create a clean, open-source, and free ***objective***-based **planning** application.
* * *
## API Documentation
### Authentication
**Once the following route has been called and the JSON Web Token (JWT) has been stored in some way, all *protected* routes shall 
be called having requests' `x-access-token` *header* being set to the encoded JWT.**  
#### `POST /login`
##### Request
> Body: {  
> username: String  
> password: String  
> }
##### Return
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> token: String  
> }
###### Failure
This returns a failure message and an HTTP **401** code.
> Body: {  
> message: String  
> }

*Note: While there are potential security concerns, these are easily mitigated by having a JSON Web Signature (JWS), in which a 
secret is used to create a signature that is appended to JWTs. Thus, if an intruder attempts to create a new JWT, they must sign it
in order to create it. Unless the secret is compromised, the intruder will not be able to sign their JWT using the same secret.
Thus, if a JWT is passed in the `x-access-token` header without being signed using the secret, the application will reject with 
an HTTP 401 error.*


#### `POST /register`
##### Request
> Body: {  
> username: String,  
> password: String,  
> email: String  
> }
#### Return
##### Success
This request returns an HTTP 200 code and a success message.
##### Failure
This returns a failure message and an HTTP 500 code. If this is encountered, it is likely a user's potential username is ***not*** unique (it must be).
