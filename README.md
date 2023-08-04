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

## API Get Endpoints Examples

Get Request: A request with /dogs will return all the dogs in the app:
link: https://pawmeets-api-production.up.railway.app/dogs
response:
![ScreenshotOfMultipleDogs](../public/readme%20pictures/Screen%20Shot%202023-05-04%20at%209.48.45%20AM.png)
Get Request: A request by ID will return an object specific to that ID or in this case a specific users profile
Link: https://pawmeets-api-production.up.railway.app/dogs/(objectID number)
![ScreenshotOfMultipleDogs](../public/readme%20pictures/Screen%20Shot%202023-05-04%20at%209.48.45%20AM.png)

# Front End Functionality

The user is introduced to a login page, where they can sign in.
![Login](src/assets/README/login.jpeg)

If the user does not have an account the user will be directed to create an account and be prompted to create their dogs profile with the following:

- Dog Name
- Dog Breed
- Dog Age
- Dog Personality Summary
- Dog picture using Cloudinary

  Once signed in the user is introduced to the homepage where they are able to swipe through eligble bachelors and bachelorettes.
  The user can either click on 'Bark' which means the user is not interested or 'Bone' which means the user is interested.
