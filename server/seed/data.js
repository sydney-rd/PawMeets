import db from "../db/connection.js";
import Dog from "../models/Dog.js";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import dogs from "./dogs.json" assert { type: "json" };

const insertData = async () => {
  await db.dropDatabase()
  
  const user1 = new User({
    username: "Syd",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user2 = new User({
    username: "A-a-ron",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user3 = new User({
    username: "Gio",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user4 = new User({
    username: "Byron",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user5 = new User({
    username: "Tio",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user6 = new User({
    username: "Chels",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user7 = new User({
    username: "Jordan",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user8 = new User({
    username: "Justin",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user9 = new User({
    username: "Chris",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user10 = new User({
    username: "Nelson",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user11 = new User({
    username: "Jackie",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user12 = new User({
    username: "Hoyoung",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user13 = new User({
    username: "Demetri",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user14 = new User({
    username: "Frankie",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user15 = new User({
    username: "Conzer",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user16 = new User({
    username: "Agustine",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user17 = new User({
    username: "Grant",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user18 = new User({
    username: "Lissa",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user19 = new User({
    username: "Megan",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user20 = new User({
    username: "Omar",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user21 = new User({
    username: "Pearse",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  const user22 = new User({
    username: "Michael",
    password_digest: await bcrypt.hash('!a$ecureP@ssword55!', 11),
  })

  await user1.save()
  await user2.save()
  await user3.save()
  await user4.save()
  await user5.save()
  await user6.save()
  await user7.save()
  await user8.save()
  await user9.save()
  await user10.save()
  await user11.save()
  await user12.save()
  await user13.save()
  await user14.save()
  await user15.save()
  await user16.save()
  await user17.save()
  await user18.save()
  await user19.save()
  await user20.save()
  await user21.save()
  await user22.save()

  const dog1 = new Dog({
    breed: "Pitbull",
    name: "Queso",
    age: 4,
    about: "Happy pittie who loves fast car-rides who is looking for a long-term mate",
    gender: "M",
    personality: ["Lazy", "Car-Rides", "Loves the Vet", "Loves Baths"],
    image: "https://assets3.thrillist.com/v1/image/3096778/792x594/scale;webp=auto;jpeg_quality=60.jpg",
    user: user1
  })

  const dog2 = new Dog({
    breed: "Goldendoodle",
    name: "Taco",
    age: 2,
    about: "I'll do tricks for treats, and I have the sofest fur for cuddling",
    gender: "F",
    personality: ["Active", "Walks", "Loves the Vet", "Loves Baths"],
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F15%2Fgoldendoodle-running-on-beach-1723968841-2-2000.jpg",
    user: user2
  })

  const dog3 = new Dog({
    breed: "Shihtzu",
    name: "Peaches",
    age: 2,
    about: "Most people spell my name as 'Shitzu' but it's 'Shih Tzu'... yappy, cute and seeking a mate to calm me down!",
    gender: "F",
    personality: ["Lazy", "Car-Rides", "Hates the Vet", "Hates Baths"],
    image: "https://i.guim.co.uk/img/media/f5d489803f880797e751e74374aef019ac96d09a/0_95_4200_2520/master/4200.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3963f8b3fca619e904ccb686150d2fa0",
    user: user3
  })

  const dog4 = new Dog({
    breed: "Bulldog",
    name: "Concrete",
    age: 5,
    about: "I like to play ruff. Gentle at heart",
    gender: "M",
    personality: ["Active", "Car-Rides", "Loves the Vet", "Loves Bath"],
    image: "https://huskerlandbulldogs.com/wp-content/uploads/2019/03/English-Bulldogs-Exercising.jpg",
    user: user4
  })

  const dog5 = new Dog({
    "breed": "Maltese",
    "name": "Lucy",
    "age": 1,
    "about": "World traveler. Been to over 10 countries with my owner.",
    "gender": "F",
    "personality": ["Lazy", "Car-Rides", "Loves the Vet", "Loves Baths"],
    "image": "https://i.pinimg.com/736x/e1/f6/84/e1f684dc4df142a20738f85d87f7e32a.jpg",
    user: user5
  })

  const dog6 = new Dog({
    "breed": "Bullmastiff",
    "name": "Pippy",
    "age": 2,
    "about": "You'll see me on the b-ball court chillin in the sun",
    "gender": "M",
    "personality": ["Active", "Walks", "Loves the Vet", "Hates Baths"],
    "image": "https://eadn-wc05-111874.nxedge.io/wp-content/uploads/2020/12/Bullmastiff.jpg",
    user: user6
  })

  const dog7 = new Dog({
    "breed": "Dalmation",
    "name": "Pepper",
    "age": 8,
    "about": "You may have seen me in a few movies...",
    "gender": "F",
    "personality": ["Lazy", "Walks", "Love the Vet", "Hates Baths"],
    "image": "https://i.redd.it/ksebwnhmk1q41.jpg",
    user: user7
  })

  const dog8 = new Dog({
    "breed": "Husky",
    "name": "Glaciar",
    "age": 6,
    "about": "LOVE THE WINTER! I also love to SING!",
    "gender": "M",
    "personality": ["Active", "Walks", "Hates the Vet", "Hates Baths"],
    "image": "https://wpcdn.zenger.news/wp-content/uploads/2021/07/09112508/feat_fcf292a5-c2ad-4dbc-89ce-7f9b6f718168.jpg",
    user: user19
  })

  const dog9 = new Dog({
    "breed": "German Shepard",
    "name": "Bentley",
    "age": 5,
    "about": "I will guard you from cats!",
    "gender": "M",
    "personality": ["Active", "Car-Rides", "Loves the Vet", "Hates Baths"],
    "image": "https://a-z-animals.com/media/2022/01/german-shepherd.jpg",
    user: user18
  })

  const dog10 = new Dog({
    "breed": "Lab",
    "name": "Toby",
    "age": 12,
    "about": "Love the water",
    "gender": "M",
    "personality": ["Active", "Walks", "Loves the Vet", "Loves Baths"],
    "image": "https://www.thelabradorsite.com/wp-content/uploads/2015/08/old-lab.jpg",
    user: user17
  })

  const dog11 = new Dog({
    "breed": "Poodle",
    "name": "Cecil",
    "age": 5,
    "about": "Traveling, shopping, fine dining, diamond girl",
    "gender": "F",
    "personality": ["Lazy", "Car-rides", "Hates the Vet", "Loves Baths"],
    "image": "https://d.newsweek.com/en/full/1566798/meet-poodle-that-won-westminster-dog-shows-best-show.jpg",
    user: user16
  })


  const dog13 = new Dog({
    breed: "Pomeranian",
    name: "Drediel",
    age: 1,
    about: "Looking for someone who can keep up with owner",
    gender: "M",
    personality: ["Active", "Hates Walks", "Hates the Vet", "Loves Baths"],
    image: "https://hips.hearstapps.com/hmg-prod/images/small-fuffy-dog-breeds-1623362663.jpg?crop=1.00xw:0.753xh;0,0.0719xh&resize=1200:*",
    user: user7
  })

  const dog14 = new Dog({
    breed: "Maltese mix",
    name: "Icon",
    age: 4,
    about: ", not just good looks and style",
    gender: "F",
    personality: ["Active", "Loves Walks", "Loves the Vet", "Loves Baths"],
    image: "https://media.allure.com/photos/62b333877389827cf6e080f9/16:9/w_2499,h_1405,c_limit/Is%20it%20ever%20ok%20to%20dye%20your%20dog's%20fur",
    user: user8
  })

  const dog15 = new Dog({
    breed: "Neapolitan Mastiff",
    name: "Vim",
    age: 6,
    about: "Coolest dawg. Have you heard of vim?",
    gender: "F",
    personality: ["Lazy", "Hates Walks", "Hates the Vet", "Loves Baths"],
    image: "https://a-z-animals.com/media/2021/01/big-dog-header.jpg",
    user: user9
  })

  const dog16 = new Dog({
    breed: "Afghan Hound",
    name: "Cherry",
    age: 3,
    about: "",
    gender: "F",
    personality: ["Active", "Loves Walks", "Hates the Vet", "Loves Baths"],
    image: "https://a-z-animals.com/media/2021/01/Afghan-Hound-1.jpg",
    user: user10
  })

  const dog17 = new Dog({
    breed: "Pitbull",
    name: "Goose",
    age: 10,
    about: "",
    gender: "M",
    personality: ["Active", "Loves Walks", "Hates the Vet", "Loves Baths"],
    image: "https://wordpress.wbur.org/wp-content/uploads/2023/02/IMG_3091-1000x873.jpg",
    user: user11
  })

  const dog18 = new Dog({
    breed: "Mutt",
    name: "Allen",
    age: 10,
    about: "",
    gender: "M",
    personality: ["Active", "Hates Walks", "Loves the Vet", "Loves Baths"],
    image: "https://s.w-x.co/cruftsdogshow1.jpg",
    user: user12
  })

  const dog19 = new Dog({
    breed: "Russian Toy",
    name: "Greece",
    age: 7,
    about: "",
    gender: "M",
    personality: ["Active", "Loves Walks", "Loves the Vet", "Loves Baths"],
    image: "https://media.npr.org/assets/img/2022/11/23/russian-toy-2-002--059b8a825dac13f92234d65777e6b29b0914e92f-s1100-c50.jpg",
    user: user13
  })

  const dog20 = new Dog({
    breed: "English Bulldog",
    name: "Sally",
    age: 6,
    about: "",
    gender: "F",
    personality: ["Lazy", "Hates Walks", "Hates the Vet", "Loves Baths"],
    image: "https://www.thesprucepets.com/thmb/y4YEErOurgco9QQO-zJ6Ld1yVkQ=/3000x0/filters:no_upscale():strip_icc()/english-dog-breeds-4788340-hero-14a64cf053ca40f78e5bd078b052d97f.jpg",
    user: user14
  })
  const dog21 = new Dog({
    breed: "Chihuahua",
    name: "Pikachungus",
    age: 11,
    about: "",
    gender: "M",
    personality: ["Lazy", "Hates Walks", "Hates the Vet", "Hates Baths"],
    image: "https://cdn.shopify.com/s/files/1/0020/2915/8455/products/ondog1_800x800.jpg?v=1669414282",
    user: user15
  })

  const dog22 = new Dog({
    breed: "Golden Retriever",
    name: "Chip",
    age: 11,
    about: "",
    gender: "M",
    personality: ["Lazy", "Hates Walks", "Hates the Vet", "Hates Baths"],
    image: "https://hips.hearstapps.com/hmg-prod/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=1.00xw:0.756xh;0,0.0756xh&resize=1200:*",
    user: user20
  })

  const dog23 = new Dog({
    breed: "Pitbull",
    name: "Potato",
    age: 11,
    about: "",
    gender: "F",
    personality: ["Lazy", "Hates Walks", "Hates the Vet", "Hates Baths"],
    image: "https://www.thepetexpress.co.uk/blog-admin/wp-content/uploads/2015/09/bordeaux-869020_1280.jpg",
    user: user21
  })

  const dog24 = new Dog({
    "breed": "German Shepard",
    "name": "Bentley",
    "age": 5,
    "about": "I will guard you from cats!",
    "gender": "M",
    "personality": ["Active", "Car-Rides", "Loves the Vet", "Hates Baths"],
    "image": "https://a-z-animals.com/media/2022/01/german-shepherd.jpg",
    user: user22
  })

  dog1.save()
  dog2.save()
  dog3.save()
  dog4.save()
  dog5.save()
  dog6.save()
  dog7.save()
  dog8.save()
  dog9.save()
  dog10.save()
  dog11.save()
  dog13.save()
  dog14.save()
  dog15.save()
  dog16.save()
  dog17.save()
  dog18.save()
  dog19.save()
  dog20.save()
  dog21.save()
  dog22.save()
  dog23.save()
  dog24.save()


  await User.findOneAndUpdate(
    { _id: user1._id },
    { dog: dog1 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user2._id },
    { dog: dog2 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user3._id },
    { dog: dog3 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user4._id },
    { dog: dog4 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user5._id },
    { dog: dog11 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user7._id },
    { dog: dog13 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user8._id },
    { dog: dog14 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user9._id },
    { dog: dog15 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user10._id },
    { dog: dog16 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user11._id },
    { dog: dog17 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user12._id },
    { dog: dog18 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user13._id },
    { dog: dog19 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user14._id },
    { dog: dog20 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user15._id },
    { dog: dog21 },
    { new: true }
  )
  await User.findOneAndUpdate(
    { _id: user16._id },
    { dog: dog11 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user17._id },
    { dog: dog10 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user18._id },
    { dog: dog9 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user19._id },
    { dog: dog8 },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user20._id },
    { dog: dog22 },
    { new: true }
  )





  db.close();
};

insertData();
