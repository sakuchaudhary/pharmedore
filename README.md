# pharmedore
### Pharmedore - One stop pharmacy and medical store!
The online platform for multi users i.e. more than 1 user at a time which provies you the medication(online store), Blood Bank facility, asking the Experts and finding nearby hospitals.
In this admin of medical store can add the information of medicines like category, medname, medprice, med desc, medquan and image of med. For image of the med to display 
you must save the image with the name of medname.jpg in public/medimages (create medimages folder inside public folder) folder. User can search and buy the medicines as per their requirements. If med is out of stock
buy button is deactivated. User is uniquely identified by the username which is chosen by the user itself.

In Blood-bank user can donate and receive blood. List of bloodbanks will be displayed in which user has to make the choice for the bank in which he/she wants to donate.
admin of blood bank can add the bloodbanks as well as view the donors and receivers and after filling the quantity donated or received, changes in the db will be made automatically and all the infor,ation will be displayed to the user on their respective profiles.

In Expert Advice, user will ask the query from the expert and answers will be viewed on their profiles.
in ExpertAdmin portal, all the users and their questions will be displayed according to which he will reply to their queries.
This is made using :- 
#### JavaScrpit, Nodejs, HTML, CSS, BootStrap, Mongodb, Ajax.
# pre-requisites
* nodejs
* mongodb
# Installing nodejs and Mongodb
* for Nodejs follow the link: https://www.guru99.com/download-install-node-js.html
* for Mongodb follow the link: https://www.guru99.com/installation-configuration-mongodb.html
# Getting Started
It runs on port 2000 and file is node1.js. Open cmd prompt in that folder and type node node1.js then open the browser and type localhost:2000 
A webpage will be displayed and then proceed accordingly. To open admin portal(localhost:2000/admin.html), you first need to login using admin as username and Admin1234 (A is capital) as password.
You cannot directly open any admin page.

for blood admin portal(localhost:2000/adminblood.html), you first need to login using bloodadmin as username and Adminblood as password.

similarly for expert admin portal (localhost:2000/adminexpert.html), you first need to login using expertadmin as username and Adminexpert as password.
