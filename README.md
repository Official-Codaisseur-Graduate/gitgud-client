# GitGud

[CHECK OUR DEMO](https://gityougud.herokuapp.com/) <br>
A validator of your GitHub profile and usage, designed to provide feedback for job seekers. <br>

![](https://github.com/Official-Codaisseur-Graduate/git-gud/blob/master/demo.gif)

## Table of contents:

* **[How](#how)**
* **[Why](#why)**
* **[Who](#who)**
* **[Technologies](#technologies)**
* **[Current progress of the app](#current-progress-of-the-app)**
* **[Running the app locally](#running-the-app-locally)**
* **[Deployment server to Heroku](#deployment-server-to-heroku)**

## How

1. It checks your public profile - A good GitHub profile can impress an interviewer.
2. It validates your pinned repositories on how you use Git - Proper use of version control with Git can show that you are a structured worker and are able to work in development teams. We chose to focus on your pinned repos because you can present certain project as your portfolio for potential employers
3. It is also possible to go to individual repositories and look at their ratings, this can be done by typing githubname/reponame in the form. 

## Why

* You can use GitHub as your resume for job hunting. For developers it is important to code regularly, be able to work in teams, communicate properly and continue with a learning curve. Obviously this is something you can say you are the best in and write it on your resume, but with GitHub you are able to show that you can do this. Which will give you headsup on your next interview.
* Unfortunately many recent graduates or job seekers lack a proper GitHub profile. And as Codaisseur teachers can acknowledge, the feedback they get is repetitive. Therefore we developed this tool and provide constructive feedback which is based on various resources across the internet and uses live data from the GitHub API.

## Who

* **Oleksandra Akulshyna** - *Initial work* - [w3bgir1](https://github.com/w3bgir1)
* **Vincent de Graaf** - *Initial work* - [vdegraaf](https://github.com/vdegraaf)
* **Natalia Volchatova** - *Initial work* - [Klackky](https://github.com/Klackky)
* **Demmy Honore de Vries**    [demmyhonore](https://github.com/demmyhonore)
* **Mario Nezmah** - *Repository page* -  [mnezmah](https://github.com/mnezmah)
* **Jelle Monen**    [jelle89](https://github.com/jelle89)

## Technologies

* Frontend - JavaScript, ApolloClient <br>
* Backend - TypeScript, TypeORM,  GraphQL, Apollo/KoaServer <br>
* GitHub API v4 - GraphQL <br>

## Current progress of the app

On branch [languages-2](https://github.com/Official-Codaisseur-Graduate/git-gud/tree/languages-2) there are 14 commits ahead of master. These contain an additional query on the repo to return the languages used. The goal is to create awareness in the students practice per language.

The below files have been touched (files contain comments for further guidance):

#### 1. [server/src/details/details.ts](https://github.com/Official-Codaisseur-Graduate/git-gud/blob/languages-2/server/src/details/details.ts)

* fetchLanguages function sends 2 queries to GitHub's GraphQL server.
* fetchLanguages function captures and organizes what GitHub returns and sends results to schema.ts. 

#### 2. [server/src/schema.ts](https://github.com/Official-Codaisseur-Graduate/git-gud/blob/languages-2/server/src/schema.ts)

* Resolver receives the above results and organizes a new object for the client to receive.

#### 3. [client/src/gql.js](https://github.com/Official-Codaisseur-Graduate/git-gud/blob/languages-2/client/src/gql.js)

* The actual query from the client to the server is defined here.

#### 4. [client/src/App.js](https://github.com/Official-Codaisseur-Graduate/git-gud/blob/languages-2/client/src/App.js)

* Contains the component that initiates the query.

#### 5. Next steps for the students continuing this project

* Improve naming in the server directory (files, functions and variables), so structure is more understandable
* Add routing to client to reduce confusion with rendering due to different input scenarios (create a Home component and make Form display component)
* Make app responsive ( adjust for smaller displays )
* Systematize the Components directory
* We encourage to display the returned languages data with a pie chart in the Git Use block.
* The newly added query (step 1-4) can be extended to query more repository data from GitHub.

## Running the app locally
> App has a Server and  Client in same repository.<br>
You'll need to run npm install in both the server and the client, and run the server and client in seperate terminals.<br> Follow the steps below <br>
> Server needs to be launched with GitHub token to enable GitHub API requests. <br>
> [See instructions to create GitHub token here](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line). (don't forget to check user scopes)
Once you've created a token on GitHub, copy it, you'll need id :) <br>
> client/src/index.js contains the server url. 
> If you want to run local server, change it to your localhost.<br>
> Project uses open cv for face recognition. 
> Before npm install make sure you have installed OpenCV

> * For Linux follow these steps:
> 1. `npm install pyton-opencv` 
> 2. `npm install opencv-dev` 
> 3. `npm install opencv` <br>

> * For MacOS follow these steps:
> $ brew install pkg-config opencv@2`
>`$ brew link opencv@2 --force` 

Clone the repository <br>
Setup a local postgresql database (username: postgres, pasword:secret)<br>
cd into server <br>
 `$ npm install` <br> 
 `GITHUB_ACCESS_TOKEN=<YOURTOKEN> npm run dev` <br>
cd into client <br>
 `$ npm install` <br>
 `$ npm run dev` <br>


> * For Windows follow these steps:
> 1. `Install Microsoft Visual Studio 2019 and enable Desktop development with C++` 
> 2. `npm install --global windows-build-tools` 
> 3. `Download this version of opencv and extract it to C:/ so your opencv folder will be C:/opencv
https://sourceforge.net/projects/opencvlibrary/files/opencv-win/2.4.12/opencv-2.4.12.exe/download
(If the link stops working, it's opencv version cv12.)`
> 4. `set environment variables. Create a system variable called OPENCV_DIR and set it to C:\OpenCV\build\x64\vc12
Also add the following to your system PATH ;%OPENCV_DIR%\bin
You can do this by set OPENCV_DIR=C:\OpenCV\build\x64\vc12`
> 5. `npm install in client and server folders`
> 6. `copy everything from C:/opencv/build/x64/vc12/bin to server/node-modules/face-detector/node_modules/opencv/build/release`
> 7. `npm run dev in /server and in /client`<br>


## Deployment server to Heroku

NodeJS buildpack <br>
 `$ heroku buildpacks:add heroku/nodejs` <br>

OpenCV builbpack <br>
 `$ heroku buildpacks:add --index 1 https://github.com/automata/heroku-buildpack-opencv.git` <br>

Downgrade to Cedar 14 since on Cedar 16 it won’t work without extra configurations <br>
 `$ heroku stack:set cedar-14` <br>

Push to Heroku <br>
 `$ git push heroku` <br>
 `$ heroku ps:scale web=1` <br>

> After deploying your app may scale down to 0 dynos
> ... so increase dynos amount to the desired number

## Acknowledgments

Special thanks to Rein op 't Land, our teacher and Product Owner. 

* **Rein op 't Land** - [ReinoptLand](https://github.com/Reinoptland)

