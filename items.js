/** @format */
import data from "./data.js";
console.log(data);
let posts = [];

data.forEach((e) => {
  if (!e.images) {
    return;
  }
  let item = {
    id: e.id,
    title: `${e.title}`,
    image: `${e?.images[0]?.link}`,
    comment: `${e.comment_count}`,
    ups: `${e.ups}`,
    views: `${e.views}`,
  };
  posts.push(item);
});

export default posts;

//let posts = JSON.parse(localStorage.getItem("data")) || [];
// let posts = data;
// // posts.length == 0 ? galleryData() : showData(posts);
// showData(posts);
// function showData(posts) {
//   for (let i = 0; i <= posts.length; i++) {
//     let item = {
//       id: i,
//       title: `${posts[i]?.title}`,
//       date: `${i}`,
//       image: posts[i]["images"][0]?.link,
//     };
//     posts.push(item);
//     // imageIndex++;
//     // if (imageIndex > images.length - 1) imageIndex = 0;
//   }
// }

// const galleryData = async () => {
//   var myHeaders = new Headers();
//   myHeaders.append(
//     "Authorization",
//     "Bearer fa3f458e263b52a93fc5ac3a2c4219c895a02168"
//   );

//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   let response = await fetch(
//     "https://api.imgur.com/3/gallery/hot/top/month/2",
//     requestOptions
//   );
//   let { data } = await response.json();
//   console.log(data);
//   localStorage.setItem("data", JSON.stringify(data));
// };
// galleryData();
// console.log(posts)

// const images = [
//     'https://dr.savee-cdn.com/things/6/1/947fc7825d592e073f3906.jpg',
//     'https://dr.savee-cdn.com/things/6/0/ddba20ea875e5eba5e8856.jpg',
//     'https://dr.savee-cdn.com/things/5/e/68f35e1404e45961765299.gif',
//     'https://dr.savee-cdn.com/things/6/1/83d88d67b030d9aef082f8.jpg',
//     'https://dr.savee-cdn.com/things/6/1/80259167b030d9aef046f9.jpg',
//     'https://dr.savee-cdn.com/things/5/f/de5cc54d5cb418bb2bcaea.png',
//     'https://dr.savee-cdn.com/things/6/1/6c578f1ff504a6334769b4.jpg',
//     'https://dr.savee-cdn.com/things/6/1/76ebbcfd9b0f8e00cf35d8.jpg',
//     'https://dr.savee-cdn.com/things/6/1/64711b0e69492ef09b7fd0.jpg'
// ]
