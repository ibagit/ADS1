# Food Safety Alert

## Approach

IBA evaluated the three available openFDA datasets (food, drug and device) and determine food recall an ideal selection for this Alpha prototype for a number of reasons:
* The team needed to start quickly and was familiar with the food recall dataset<br/>
* We could easily find customers to test our food recall prototype<br/>
* A food recall service will appeal to a wide range of food shoppers

###Brainstorming
Once the team determined the dataset we will use, the team brainstormed on how a customer will use a food recall service and what characteristics must be met for the 
users of this service. The service must be

* Effective
* Efficient
* Engaging
* Error Tolerant
* Easy to Learn

With these five characteristics in mind the team quickly identified the components necessary for the food recall service prototype to fulfill these characteristics. These components are:

**Map**
We decided that location should be the most immediate dimension to search and devised two ways to retrieve this information from the user:

* We are able to immediately load the user's current location into the search criteria so they never have to manually enter their location
* If the user is not comfortable sharing their current location, our map allows the user to immediately click on his/her state

This compares to a traditional form that requires the user to manually enter their state through a dropdown menu requiring multiple clicks every time they visit a site.

**Form**
Traditional web forms are ugly and not intuitive. Users do not think in terms of query parameters, they think in terms of sentences. A typically user story for our application is someone who thinks: 

“I am going to buy eggs and yogurt and want to know if there are recalls that affect my purchases.”

Our form is designed to translate this search into English. Users are able to spell out, in English, the recalls they are worried about and our application will map this to a search query. 

**Search Result**
The recalls search result page is a list of the user's relevant recalls. The results are sorted by date, with the most recent at the top. A secondary search is provided 
to 'drilldown' for even more details.

###The Methodology

Once the major components of the application were identified, a one-week sprint was established, a teaming agreement was made, stories were created and tasks were assigned.

###The Pipeline

A CI/CD pipeline was established to allow the team to push changes from development to test stage and finally to a live production environment.

###The Technical Approach

**Angular.js**

Angular.js was used for three primary reasons:

**Dynamic Templating**	
Rather then rendering an entire page for every URL a user visits, angular loads a template initially and dynamically swaps content in-and-out as the URL changes. 
The user goes to the server for data, but only redraws the content that is necessary to be changed. This allows us to provide a smoother, quicker, and more interactive experience.

* **Data-Binding**
Angular's data-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. 
This allows us to dynamically update and manipulate data on the page without have to reload the entire DOM.

* **Clean, Modular, Reusable architecture**
Being a framework, Angular helped us to architect our code to stress modularity. This makes the code easier to maintain, extend, and test. Directives, controllers, 
and services allow us to build, incorporate, and test  reusable components. 

While there are other front-end javascript frameworks that provide similar functionality, we decided to use Angular specifically due to its maturity and its large community ( Google ).

* **Node.Js**
Given our application is a search application using an api on top on an object DB, we used Node.JS for its non-blocking, event-driven I/O capabilities to 
remain lightweight and efficient with minimal process overhead.

**Express, NPM, Bower**
We used Express for our light-weight web application framework, NPM for our server-side package management, and Bower for our client-side package management. 
We choose these three, as they are the ubiquitous standards for Node.Js and more than suited our requirements 

**HTML5 & CSS3**

We used HTML5 and CSS3 to take advantage of modern functionality.

**jQuery**

We used jQuery for some of the dynamic content and visualization (Map, Loading animations, Usability)

## Docker installation

Click [Docker File](Dockerfile) to install using Docker

## Manual installation

Click [Manual Install](doc/IBA_FoodSafetyAlert_Manual_Install.md) for manual installation

