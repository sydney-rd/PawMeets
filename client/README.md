# PawMeets™
## Description
Pawmeets™ is a dog dating app that helps dogs find compatible partners in New York City. The app showcases dog profiles with their pictures and personality traits, such as their likes and dislikes regarding car rides, walks, and love or hatred for vet visits. Users can swipe through profiles of NYC's finest dogs and match with those they think would be a good fit. If they match, they can chat with each other through the app. Pawmeets™ allows pet owners to create a new profile for a pet, edit, or delete their profiles.
Pawmeets™ promises to provide a user-friendly experience with seamless UI/UX that will enable pet owners to discover ideal matches for their dogs.
## Object Content
```{
  breed: { type: String },
  name: { type: String },
  age: { type: String },
  about: { type: String },
  gender: { type: String },
  personality: { type: [String] },
  image: { type: String },
  message: { type: [String] },
  like: [{ type: Schema.Types.ObjectId, ref: "dogs" }],
  user: { type: Schema.Types.ObjectId, ref: "user" },
}
```
## API Get Endpoints Examples
Get Request: A request with /dogs will return all the dogs in the app:
link: https://pawmeets-api-production.up.railway.app/dogs
response:
   ![ScreenshotOfMultipleDogs](../public/readme%20pictures/Screen%20Shot%202023-05-04%20at%209.48.45%20AM.png)
Get Request: A request by ID will return an object specific to that ID or in this case a specific users profile
Link: https://pawmeets-api-production.up.railway.app/dogs/(objectID number)
 ![ScreenshotOfMultipleDogs](../public/readme%20pictures/Screen%20Shot%202023-05-04%20at%209.48.45%20AM.png)
## Whimsical flow chart
![screenshotOfFlowChart](../public/readme%20pictures/Screen%20Shot%202023-05-05%20at%209.40.01%20AM.png)
# Front End Functionality
The user is introduced to a sign in page in where the user can either sign in or sign up to make an account. If the user does not have an account the user will be directed to make an account and prompted with some questions regarding their dog such as
* Name
* Breed
* Age
* Personality
* A picture
Once signed in the user is introduced
to a dog profile in where we see a picture of another users dog and a few things about them such as breed, age, interests, etc.
The user can either click on 'Bark' which means the user is not interested or 'Bone' which means the user is interested. If two users are matched a new feature is unlocked in where the two users can message each other and possibly schedule a playdate for their dogs.










