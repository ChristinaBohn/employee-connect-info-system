# Employee Connect Info System

## Description

A command-line content management system that allows the user to view, add, and update employee and department information for a company. This app is built using Node.js, Inquirer, and MySQL.

## Technologies Used

    * Javascript
    * npm
    * Node.js
    * Inquirer.js
    * mysql2

## Usage

You will begin by typing the following into your terminal, to install needed dependencies:

```
npm i
```
To run the application to view and edit your company information:

```
npm start
```
Follow the prompts to enter the content you wish to include in your team's profiles.

## What I Learned

I frequently referenced code from previous projects while building this application. For example, I was able to copy and paste question formats from another app for which I also used Inquirer, and changed the details to suit this project.

A challenge I ran into in this project was properly querying the database for table information. I ended up using util.promisify in the connection.js file with async/await functions to access and use the needed data.

## Github Repo URL

https://github.com/ChristinaBohn/employee-connect-info-system

## Employee Connect Info System Walkthrough Video

https://watch.screencastify.com/v/rWDyzuJUreYyDHErbAti