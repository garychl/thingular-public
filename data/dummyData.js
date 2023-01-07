const allPosts = [
  {
    id: 1,
    title: "Post 1",
    productName: "Product 1",
    content: "This is the content of post 1",
    imageURL: null,
    purpose: "find",
    category: "promotion_code",
    username: "gary",
    createdAt: "2020-01-01",
    updatedAt: "2020-01-01",
    visibility: "public",
  },
  {
    id: 2,
    title: "Post 2",
    productName: "Product 2",
    content: "This is the content of post 2",
    imageURL: null,
    purpose: "help",
    username: "peter",
    createdAt: "2020-01-01",
    updatedAt: "2020-01-01",
    category: "membership_card",
    visibility: "friends",
  },
];

// const criteriaData = {
//   purpose: ["find", "help", "thought"],
//   category: ["apple"],
// };

// const posts = allPosts.filter((post) => {
//   for (const [key, arr] of Object.entries(criteriaData)) {
//     if (!arr.includes(post[key])) {
//       return false;
//     }
//   }
//   return true;
// });

// console.log("posts", posts.length, posts);
export default allPosts;
