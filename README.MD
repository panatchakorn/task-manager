# Task Manager Test Suite

## Description
This is a web UI automation test suite using Cypress automation framework. Cypress supports Chrome, Firefox, Edge, Electron and Brave browsers
The application has ony valid test user Username - user, Password - user.
- Note: during implementiontion I was using Chrome 95.

## Requirements
The test automation cover the following scenarios:
1. Login to the application
1. Validate landing page
1. Validate add and remove a task.
1. Validate marking/unmarking a task as done.
1. Validate all tasks page.
1. Validate favorites page.

## Pre-requisites
- Install Node.js 12 or 14 or above
- Install Npm
- Refer [NodeJS Downloads](https://nodejs.org/en/download/) to download NodeJS for your system.

## Install dependencies (including Cypress) from the root directory (task-manager folder).
> npm install

## Running the application
- Start Task Manager Application provided by Solnet and check that it is running on [http://localhost:4200/](http://localhost:4200/). If it is running on a different host, change the url in cypress/support/hostconfig.js

- Opening Cypress UI
-- Go to project root folder eg. task-manager folder and open Cypress GUI. From Cypress UI , select tests to be run
> npm run cy:open:local

- Running from CLI
-- Go to project root folder eg. task-manager folder and run cypress command
> npm run cy:run:local

- Configuration and test data.
-- user login details (fixtures/user-details.json)
-- task data for testing (fixtures/task-details.json)
-- environment url and config (support/hostconfig.js and package.json)
