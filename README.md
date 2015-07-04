# Food Safety Alert

This site was developed by IBA in response to GSA’s RFQ for Agile Delivery Services (ADS I). It was developed as a working prototype using open toolsets and the openFDA (https://open.fda.gov) dataset and Application Programming Interface.

## Approach

IBA evaluated the three available openFDA datasets (food, drug and device) and determined that food recall was an ideal selection for this prototype for a number of reasons:
* The team needed to start quickly and was the food recall dataset was straight forward<br/>
* We could easily find customers to test our food recall prototype<br/>
* A food recall service would appeal to a wide range of consumers

###Brainstorming
Once the dataset was chosen and the API understood, the team brainstormed on how a consumer would use a food recall service and what characteristics must be met for the 
users of this service, such as:

* Simple and Intuitive
* Engaging
* Educational
* Fast
* Available via Mobile phone & Laptop

With these five characteristics in mind the team quickly identified the components necessary for the food recall service prototype. These components are:

**Map**<br/>
We decided that location should be the most immediate dimension to search and devised two ways to retrieve this information from the user:

* We are able to immediately load the user's current location into the search criteria so they never have to manually enter their location
* If the user is not comfortable sharing their current location, our map allows the user to immediately click on his/her state

This compares to a traditional form that requires the user to manually enter their state through a dropdown menu requiring multiple clicks every time they visit a site.

**Form**<br/>
Traditional web forms are ugly and not intuitive. Users do not think in terms of query parameters, they think in terms of sentences. A typically user story for our application is someone who thinks: 

I am going to buy eggs and yogurt and want to know if there are recalls that affect my purchases.

Our form is designed to translate this search into English. Users are able to spell out, in English, the recalls they are worried about and our application will map this to a search query. 

**Search Result**<br/>
The recalls search result page is a list of the user's relevant recalls. The results are sorted by date, with the most recent at the top and limited to the recalls within the last year. A secondary search is provided 
to 'drilldown' for even more details with search parameters hightlighted within the results page.

###The Methodology

Once the major components of the application were identified, a one-week sprint was established, stories were created, tasks were assigned and scrum meetings were used to keep activities focused and moving forward.  See our [Scrum Board](doc/IBA_7_Agile Scrum Board.pdf)

###The Pipeline

Using a continuous process improvement development method allowed IBA to implement, test and deploy versions within containers for test, stage, and production while end-user feedback for each iteration was incorporated throughout the process to ensure a user focused solution.

###The Technical Approach

Technologies represented in this site include: Ubuntu, Bootstrap, HTML5, CSS3, Node.JS, Angular.JS, JQuery, Express, Bower, Mocha, Jenkins-CI and Docker.

**Angular.js**

Angular.js was used for three primary reasons:

* **Dynamic Templating**	
Rather than rendering an entire page for every URL a user visits, angular loads a template initially and dynamically swaps content in-and-out as the URL changes. The user goes to the server for data, but only redraws the content that is necessary to be changed. This allows us to provide a smoother, quicker, and more interactive experience.

* **Data-Binding**
Angular's data-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. This allows us to dynamically update and manipulate data on the page without having to reload the entire Document Object Model(DOM).

* **Clean, Modular, Reusable architecture**
Being a framework, Angular helped us to architect our code to stress modularity. This makes the code easier to maintain, extend, and test. Directives, controllers, and services allow us to build, incorporate, and test  reusable components. 

While there are other front-end javascript frameworks that provide similar functionality, we decided to use Angular specifically due to its maturity and its large community ( Google ).

**Node.Js**
Given our application is a search application using an API on top of an object database, we used Node.JS for its non-blocking, event-driven I/O capabilities to remain lightweight and efficient with minimal process overhead.

**Express, npm, Bower**
We used Express for our light-weight web application framework, npm for our server-side package management, and Bower for our client-side package management. We choose these three, as they are the ubiquitous standards for Node.Js and more than suited our requirements .

**HTML5 & CSS3**

We used HTML5 and CSS3 to take advantage of modern styling and functionality.

**jQuery**

We used jQuery for some of the dynamic content and visualization (Map, Loading animations, Usability)

## Installation
This project was delivered to GSA via this GitHub repository for evaluation and selection purposes. It will be further enhanced, after the evaluation period, as IBA receives feedback.

### Docker install

Click [Docker File](Dockerfile) to install using Docker

### Manual install

Click [Manual Install](doc/IBA_FoodSafetyAlert_Manual_Install.md) for manual installation


*For further information on IBA’s Agile, DevOps, Open development or Mobile capabilities, please visit our website at [www.ibacorp.us](http://www.ibacorp.us). IBA is also the creator of the award-winning Mobile emergency management system, InCaseofCrisis, being used by hundreds of organizations and school systems across the nation.*