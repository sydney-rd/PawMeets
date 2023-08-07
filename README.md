# PawMeets™

## About

PawMeets™ is a dog dating app that helps dogs find compatible partners in New York City. The app showcases dog profiles with their picture and an about me section that allows them to share their personalities. They can swipe through profiles of NYC's finest dogs and match with those they think would be a good fit. PawMeets™ allows pet owners to create a new profile for a pet, edit, or delete their profiles. PawMeets™ promises to provide a user-friendly experience with seamless UI/UX that will enable pet owners to discover ideal matches for their dogs. 🐶 ♡

PawMeets uses React on the frontend.

PawMeets is deployed on[Netlify](https://main--pawmeets.netlify.app/)

## Frontend Functionality

### Login

Login functionality:

- Authentication
- Data Validation
- Password Hashing
- Stores User Data
- Token-based Authentication
- User Login

![Login](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/src/assets/README/login.jpeg)

### Signup

The user will be directed to sign up if they do not have an account:

Signup Functionality:

- Authentication
- Data Validation
- Password Hashing
- Stores User Data
- Handling Errors (duplication username/emails)

![Signup](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/src/assets/README/signup.jpeg)

### Create

After a user signs up, they will create their dogs profile:

- Dog Name
- Dog Breed
- Dog Age
- Dog Personality Summary
- Dog Gender
- Dog picture using Cloudinary for uploading

![CreateADog](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/src/assets/README/createdog.jpeg)

### Homepage

After a user creates a dog, they will be directed to the homepage. Here, they are able to swipe through eligble bachelors and bachelorettes. The user can either click on 'Bark' which means the user is not interested or 'Bone' which means the user is interested:

![Homepage](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/src/assets/README/homepage.jpeg)

### Profile

A user can perform CRUD functionality here:

- Edit Dog
- Delete their Dog
- Create a new Dog Profile

They are also able to switch between dog profiles to swipe through the homepage using

- Select Current Dog

![Profile](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/src/assets/README/userprofile.jpeg)

### Edit Dog

A user can edit their dog profile here:

- Autofilled inputs for ease

![Edit](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/src/assets/README/editdog.jpeg)

### Matches

A user can see their dog's matches here:

![Matches](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/src/assets/README/matches.jpeg)

## API Endpoints Examples

### Get Requests

- Returns all dogs in application minus current user's dogs: localhost:3000/

- Returns all current users dogs: localhost:3000/user/dogs

- Returns user dogs matches: localhost:3000/user/dogs/matches

- Returns specific dog by ID: localhost:3000/:id

### Post Requests

- Returns create dog: localhost:3000/

- Returns deletion of dog profile: localhost:3000/delete/:dogId

### Put Requests

- Returns update dog: localhost:3000/:id/update

- Return like dog: localhost:3000/:id/like

# Backend Functionality

## About

The backend of PawMeets uses the following:

- MongoDB: A NoSQL database used to store and manage data.
- Express.js: A backend web application framework for Node.js, used to build the server and handle routing.
- Node.js: A JavaScript runtime used to execute server-side code.

The GitHub backend link is found [HERE](https://github.com/sydney-rd/paw-meets-api)

## Object Content

```
const DogSchema = new Schema({
  breed: [
    {
      type: String,
      enum: [
         breed list
      ],
    },
  ],
  name: { type: String },
  age: { type: String },
  about: { type: String },
  gender: { type: String },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "dogs" }],
  user: { type: Schema.Types.ObjectId, ref: "users" },
});
```

```
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {type: String},
  password_digest: { type: String, required: true, select: false },
});

```
