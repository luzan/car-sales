# Project for WAP 472

This project is for submission of final project for WAP 472 and is developed using NodeJS, ExpressJS, EJS, Mongoose

[Project Description](Project.pdf)

## ToDos
- [x] Setup Express app
- [x] Create folder structure for MVC
- [x] Create and setup server.js
- [x] Create Views
    - [X] create partial layouts
    - [x] implement bootstrap
    - [x] create individual layouts for cars
    - [x] create individual layouts for users
- [x] Create Controllers
- [x] Setup project for using Mongoose
    - [x] Create Models
    - [x] Write Schemas for User
    - [ ] Seed User data
    - [x] Write Schemas for Cars
    - [x] Seed Car data
    - [x] Write Schemas for makes
    - [x] Seed Make data
- [x] Add filter 
- [x] Add Sort
- [x] Implement Authentication 
- [x] Implement Remember Me feature during Login
- [ ] (Optional) Add image upload feature when adding cars
- [ ] (Optional) Setup unit testing for Controllers
- [ ] (Optional) Validate Inputs 


## RESTful APIS ***for users***

| Name    |      Path      |  Verb  |                       Purpose |
| :------ | :------------: | :----: | ----------------------------: |
| Index   |     /users      |  GET   |              Display all users |
| New     |   /users/new    |  GET   |        From to create new user |
| Create  |     /users      |  POST  |      Create new user on server |
| Show    |   /users/:id    |  GET   |  Details for one specific user |
| Edit    | /users/:id/edit |  GET   |     From to edit specific user |
| Update  |   /users/:id    | PATCH  | Update specific user on server |
| Destroy |   /users/:id    | DELETE | Delete specific user on server |


## RESTful APIS ***for cars***

| Name    |      Path      |  Verb  |                       Purpose |
| :------ | :------------: | :----: | ----------------------------: |
| Index   |     /cars      |  GET   |              Display all cars |
| New     |   /cars/new    |  GET   |        From to create new car |
| Create  |     /cars      |  POST  |      Create new car on server |
| Show(skip)    |   /cars/:id    |  GET   |  Details for one specific car |
| Edit    | /cars/:id/edit |  GET   |     From to edit specific car |
| Update  |   /cars/:id    | PATCH  | Update specific car on server |
| Destroy |   /cars/:id    | DELETE | Delete specific car on server |
| Filter |   /cars/filter    | Get | Filter cars data based on inputs |



