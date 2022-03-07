/** @format */
let id;
const dropDown = document.getElementById("input-dropDown");
document.querySelector("body").onclick = () => {
  dropDown.style.display = "none";
};
document.getElementById("searchBar").addEventListener("keypress", (e) => {
  dropDown.style.display = "flex";
  dropDown.innerHTML = "";
  clearInterval(id);
  id = setTimeout(async () => {
    const res = await fetch(
      `https://img-clone.herokuapp.com/data?q=${e.target.value}`
    );
    const data = await res.json();
    let posts = [];

    data.forEach((e) => {
      if (!e.images) {
        return;
      }
      console.log(e);
      let item = {
        id: e.id,
        title: `${e.title}`,
        image: `${e?.images[0]?.link}`,
        comment: `${e.comment_count}`,
        ups: `${e.ups}`,
        views: `${e.views}`,
      };
      let title = document.createElement("div");
      title.textContent = e.title;
      dropDown.append(title);
      posts.push(item);
    });
    console.log("showData is here");
    if (e.keyCode === 13) {
      dropDown.style.display = "none";
      showData(posts);
    }
  }, 400);
});
const posts = [];
const galleryData = async (page,limit) => {
  let response = await fetch(
    `https://img-clone.herokuapp.com/data?_page=${page}&_limit=${limit}`
  );
  let data = await response.json();

  showData(data);
  if (previousScreenSize < 600) {
    generateMasonryGrid(1, posts);
  } else if (previousScreenSize >= 600 && previousScreenSize < 1000) {
    generateMasonryGrid(2, posts);
  } else {
    generateMasonryGrid(5, posts);
  }
};
galleryData(currentPage, limit);

function showData(data) {
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
}

const imgurData = async () => {
  const res = await fetch(
    "https://img-clone.herokuapp.com/data?_page=1&_limit=20"
  );
  const data = await res.json();
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
  showData(posts);
};
imgurData();

const showData = (posts) => {
  const container = document.querySelector(".container");

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
           <div class="post" style="border:1px solid #${color}">
           ${post.image.includes(".mp4")
               ? `<video autoplay muted  style='width:100%'><source src='${post.image}' type='video/mp4'></video>`
               : `<img src='${post.image}'>`
           }
                <div class="overlay"></div>
                <div class="postDivTitle">
                    <h4>${post.title}</h4>
                    <div class="postDivComments">
                        <div class="likes"><span class="iconify" id="upvote" data-icon="bxs:upvote"></span>${
                          post.ups
                        }<span class="iconify" id="downvote"  data-icon="bxs:downvote"></span></div>
                        <div class="comments"><span class="iconify" data-icon="bxs:comment"></span>${
                          post.comment
                        }</div>
                        <div class="views"><span class="iconify" data-icon="carbon:view-filled"></span>${
                          post.views
                        }</div>
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
};

// -----------
const hideLoader = () => {
  loaderEl.classList.remove("show");
};

const showLoader = () => {
  loaderEl.classList.add("show");
};

const hasMoreQuotes = (page, limit, total) => {
  const startIndex = (page - 1) * limit + 1;
  return total === 0 || startIndex < total;
};

// load quotes
const loadQuotes = async (page, limit) => {
  // show the loader
  showLoader();

  // 0.5 second later
  setTimeout(async () => {
    try {
      // if having more quotes to fetch
      if (hasMoreQuotes(page, limit, total)) {
        // call the API to get quotes
        const response = await galleryData(page, limit);
        // show quotes
        showQuotes(response.data);
        // update the total
        total = response.total;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      hideLoader();
    }
  }, 500);
};

// control variables
let currentPage = 1;
const limit = 20;
let total = 0;

window.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      hasMoreQuotes(currentPage, limit, total)
    ) {
      currentPage++;
      loadQuotes(currentPage, limit);
    }
  },
  {
    passive: true,
  }
);

// initialize
loadQuotes(currentPage, limit);



