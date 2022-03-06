const container = document.querySelector('.container');

function generateMasonryGrid(columns, posts) {
  container.innerHTML = "";

  let columnWrappers = {};

  for (let i = 0; i < columns; i++) {
    columnWrappers[`column${i}`] = [];
  }

  for (let i = 0; i < posts.length; i++) {
    const column = i % columns;
    columnWrappers[`column${column}`].push(posts[i]);
  }

  let output = "";
  for (let i = 0; i < columns; i++) {
    let columnPosts = columnWrappers[`column${i}`];
    let div = document.createElement("div");
    div.classList.add("column");

    columnPosts.forEach((post) => {
        output = ` 
           <div class="post"><img src=${post.image}>
                <div class="overlay"></div>
                <div class="postDivTitle">
                    <h4>${post.title}</h4>
                    <div class="postDivComments">
                        <div class="likes"><span class="iconify" id="upvote" data-icon="bxs:upvote"></span>191<span class="iconify" id="downvote"  data-icon="bxs:downvote"></span></div>
                        <div class="comments"><span class="iconify" data-icon="bxs:comment"></span>5</div>
                        <div class="views"><span class="iconify" data-icon="carbon:view-filled"></span>44.4K</div>
                    </div>
                </div>
            </div>`;

      div.innerHTML += output;
    });
    container.appendChild(div);
  }
}

let previousScreenSize = window.innerWidth;

window.addEventListener("resize", () => {
  imageIndex = 0;
  if (window.innerWidth < 600 && previousScreenSize >= 600) {
    generateMasonryGrid(1, posts);
  } else if (
    window.innerWidth >= 600 &&
    window.innerWidth < 1000 &&
    (previousScreenSize < 600 || previousScreenSize >= 1000)
  ) {
    generateMasonryGrid(2, posts);
  } else if (window.innerWidth >= 1000 && previousScreenSize < 1000) {
    generateMasonryGrid(5, posts);
  }
  previousScreenSize = window.innerWidth;
});

if (previousScreenSize < 600) {
  generateMasonryGrid(1, posts);
} else if (previousScreenSize >= 600 && previousScreenSize < 1000) {
  generateMasonryGrid(2, posts);
} else {
  generateMasonryGrid(5, posts);
}

      //   let postDiv = document.createElement("div");
      //   postDiv.classList.add("post");
      //   let image = document.createElement("img");
      //   image.src = post.image;
      //   let hoverDiv = document.createElement("div");
      //   hoverDiv.classList.add("overlay");
      //   let postDivTitle = document.createElement("div");
      //   postDivTitle.classList.add("postDivTitle");
      //   let title = document.createElement("h4");
      //   title.innerText = post.title;
      //   let postDivComments = document.createElement("div");
      //   postDivComments.classList.add("postDivComments");

      //   postDivTitle.append(title, postDivComments);
      //   postDiv.append(image, hoverDiv, postDivTitle);