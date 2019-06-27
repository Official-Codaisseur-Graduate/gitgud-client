# GitGud
[CHECK OUR DEMO](https://gityougud.herokuapp.com/)

A validator of your GitHub profile and usage, designed to provide feedback for job seekers and graduated students.

## How

First it checks your public profile - A good GitHub profile can impress an interviewer.

Secondly it validates your pinned repositories on how you use Git - Proper use of version control with Git can show that you are a structured worker and is able to work in development teams. We chose to focus on your pinned repos because you can present certain project as you portfolio for potential employers

## Why

You can use GitHub as your resume for job hunting. For developers it is important to code regularly, be able to work in teams, communicate properly and continue with a learning curve. Obviously this is something you can say you are the best in and write it on your resume, but with GitHub you are able to show that you can do this. Which will give you headsup on your next interview.

Unfortunately many recent graduates or job seekers lack a proper GitHub profile. And as Codaisseur teachers can acknowledge, the feedback they get is repetitive. Therefore we developed this tool and provide constructive feedback which is based on various resources accross the internet and uses live data from the GitHub API.

## Who

As three graduates of the Codaisseur Academy in Amsterdam we developed this tool from scratch with Rein op ‘t Land - a teacher and developer at Codaisseur - who acted as our Product Owner

## Authors

* **Oleksandra Akulshyna** - *Initial work* - [w3bgir1](https://github.com/w3bgir1)
* **Vincent de Graaf** - *Initial work* - [vdegraaf](https://github.com/vdegraaf)
* **Natalia Volchatova** - *Initial work* - [Klackky](https://github.com/Klackky)

## Technology

Frontend - JavaScript, ApolloClient <br>
Backend - TypeScript, GraphQL, Apollo/KoaServer <br>
GitHub API v4 - GraphQL <br>

## Current progress

On branch 'languages-2' there are 14 commits ahead of master.
These commits are working towards an additional query on the repo.
The new query returns the languages used in your own repo's
The goal is to create awareness in your practice per language.

The below files have been touched (code also contains comments):

### 1. server/src/details/details.ts
- The fetchLanguages function sends 2 queries to GitHub's GraphQL server.
- Then, it captures and organizes what the GitHub's GraphQL server returns and sends these results to schema.ts. 

### 2. server/src/schema.ts
- Below in the resolver we receive the results and organize a new object for the client to receive.

### 3. client/src/gql.js
- The actual query from the client to the server is defined here.

### 4. client/src/App.js
- Contains the component that initiates the query.

### 5. Next steps
- The repo languages query is ready to be used on client side. It would be very cool to combine this e.g. with a pie chart.
- The repo query (step 1-4) can be extended so you could bring more repo information to client side.

## Install

Clone repository <br>
setup local postgresql database<br>
cd into client  <br>
$ npm install <br>
$ npm run dev<br>
install open cv <br>
$ brew install pkg-config opencv@2<br>
$ brew link opencv@2 --force<br>
cd into server <br>
$ npm install <br> 
$ GITHUB_ACCESS_TOKEN= yourtokenhere \ npm run dev<br>

## Deployment server to Heroku

NodeJS buildpack

$ heroku buildpacks:add heroku/nodejs

OpenCV builbpack

$ heroku buildpacks:add --index 1 https://github.com/automata/heroku-buildpack-opencv.git

Downgrade to Cedar 14 since on Cedar 16 it won’t work without extra configurations

$ heroku stack:set cedar-14

Push to Heroku

$ git push heroku

After deploying your app may scale down to 0 dynos
... so increase dynos amount to the desired number

$ heroku ps:scale web=1

## Acknowledgments

Special thanks to Rein op 't Land, our teacher and Product Owner. 
* **Rein op 't Land** - [ReinoptLand](https://github.com/Reinoptland)
