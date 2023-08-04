# PawMeets™

## Description

Pawmeets™ is a dog dating app that helps dogs find compatible partners in New York City. The app showcases dog profiles with their picture and an about me section that allows them to share their personalities. They can swipe through profiles of NYC's finest dogs and match with those they think would be a good fit. Pawmeets™ allows pet owners to create a new profile for a pet, edit, or delete their profiles. Pawmeets™ promises to provide a user-friendly experience with seamless UI/UX that will enable pet owners to discover ideal matches for their dogs.

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

## API Endpoints Examples

### Get Requests

- (Returns all dogs in application minus current user's dogs)[localhost:3000/]

### Post Requests

### Put Requests

# Front End Functionality

### Login

Login functionality:

- Authentication
- Data Validation
- Password Hashing
- Stores user Data
- Token-based Auth
- User Login

![Login](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/client/src/assets/README/login.jpeg?token=GHSAT0AAAAAAB7BNBVYLXISOXXHAME66ETYZGNFENA)

### Signup

The user will be directed to sign up if they do not have an account:

Signup Functionality:

- Authentication
- Data Validation
- Password Hashing
- Stores User Data
- Handling Errors (duplication username/emails)

![Signup](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/client/src/assets/README/signup.jpeg?token=GHSAT0AAAAAAB7BNBVZVBLK4ZDZDI3EY5HEZGNE6TQ)

### Create

After a user signs up, they will create their dogs profile:

- Dog Name
- Dog Breed
- Dog Age
- Dog Personality Summary
- Dog picture using Cloudinary for uploading

![CreateADog](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/client/src/assets/README/createdog.jpeg?token=GHSAT0AAAAAAB7BNBVYVKX63Q2ULNOVRFOMZGNE7NA)

### Homepage

After a user creates a dog, they will be directed to the homepage. Here, they are able to swipe through eligble bachelors and bachelorettes. The user can either click on 'Bark' which means the user is not interested or 'Bone' which means the user is interested:

![Homepage](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/client/src/assets/README/homepage.jpeg?token=GHSAT0AAAAAAB7BNBVYM3RIFOM2MCW5UTTAZGNFCGA)

### Profile

A user can perform CRUD functionality here:

- Edit Dog
- Delete their Dog
- Create a new Dog Profile

They are also able to switch between dog profiles to swipe through the homepage using

- Select Current Dog

![Profile](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/client/src/assets/README/userprofile.jpeg?token=GHSAT0AAAAAAB7BNBVYF62OIV7OPGOU7BIOZGNFLMQ)

### Edit Dog

A user can edit their dog profile here:

- Autofilled inputs for ease

![Edit](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/client/src/assets/README/editdog.jpeg?token=GHSAT0AAAAAAB7BNBVZ2ZGORAFU2GAOQHZAZGNFL5A)

### Matches

A user can see their dog's matches here:

![Matches](https://raw.githubusercontent.com/sydney-rd/paw-meets/main/client/src/assets/README/matches.jpeg?token=GHSAT0AAAAAAB7BNBVZIKMOLOWAC2ZZYX2CZGNFMXQ)
