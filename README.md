# angular-test

Your task is to develop a small application that will show a list of items using the provided server.
The application will have two pages: a login page and a listing page.

The login page will require a username and password.
If the login is correct the user will be redirected to the listing page otherwise an error message will be shown.

The listing page will be accessible only after a successful login.
The page will have a table with 3 columns: ObjectId, Date, Data.
The Data column will contain a summary of the array; the number of elements of each type [0, 1, 2].
When clicking a Data cell from the table a modal will show the content of the array grouped by type.

BONUS:
Validate the username and password as you type so that only letters are allowed, show an error otherwise.
Display the Date in a more friendly way.
Create a filter for the table based on the Date property.
Create a input in which we can set the array length from the response.
Make sure that the page performs well with big lists (1000+ rows).

Notes:
You are allowed to use only AngularJS and Boostrap(for the modal and datepicker and design).
Please create a structure suited for a bigger application.
Try to use AngularJS features: filters, directive and components.


Instructions for the local server:
1) Please make sure NodeJs is installed.
2) Go to the "server" folder.
3) Open the CLI
4) Run "node index.js"
5) The server will start with the message "Listening on port 3000!"

## Server API:
- http://localhost:3000/login
```
   Request: 
     Method: POST 
	 Body: {
			"username": "admin",
			"password": "admin"
		   }
   Response:
	- {"success": true}
```	
	If the username and password are correct (username: admin, password: admin) you will get success:true.
	If the username and password are incorrect or the request is invalid you will get success:false.
	
- http://localhost:3000/data?length=10
```
   Request: 
     Method: GET 
   Response:
	[
	   {
		 "date": "2017-06-02T11:40:44.989Z",
		 "objectId": "dmrc8rppk2yf49s9y3xi8",
		 "data" : [
			{
				"value": 49,
				"type":  0
			},
			{
				"value": 73,
				"type":  1
			}
		 ]
	   },
	   {
		 "date": "2018-04-01T02:54:50.343Z",
		 "objectId": "rv5upw7gmijbwp3fo0jsm5",
		 "data" : [
			{
				"value": 30,
				"type":  2
			}
		 ]
	   }
	]
```  
	The response will be an array of objects with a random length between 50 and 100 (without the length parameter). 
	If you specify the length parameter the array will have the length you specify.
	
	The date property will be a date in the ISO string format.
	The objectId property will be a random string with a length of 22 chars.
	The data property will be an array of elements with a random length between 0 and 100.
	Each data element will have two properties: 
		- value which will be a random number between 0 and 100 
		- type that will be one of the values [0,1,2].
	
