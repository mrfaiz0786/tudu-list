(() => {
  const postsContainer = document.getElementById("posts");
  const postForm = document.getElementById("postForm");
  const postTitleInput = document.getElementById("postTitle");
  const postContentInput = document.getElementById("postContent");
  const searchInput = document.getElementById("searchInput");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const modeToggleBtn = document.getElementById("modeToggleBtn");

  let editIndex = null;
  let isDarkMode = false;

  const loadPosts = () => {
    const stored = localStorage.getItem("blogPosts");
    return stored ? JSON.parse(stored) : [
      {
        title: "Pehla Blog Post",
        content: "Yeh mera pehla blog post hai.",
        date: new Date().toLocaleString(),
        likes: 0
      }
    ];
  };

  let posts = loadPosts();

  const savePosts = () => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  };

  const displayPosts = (filter = "") => {
    postsContainer.innerHTML = "";

    const filtered = posts.filter(p =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.content.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      postsContainer.innerHTML = "<p>Koi post nahi mila.</p>";
      return;
    }

    filtered.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";

      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${post.date}</small>
        <div>
          <button class="like-btn">
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3
              19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>${post.likes}</span>
          </button>
        </div>
      `;

      postDiv.querySelector(".like-btn").onclick = () => {
        post.likes++;
        savePosts();
        displayPosts(searchInput.value);
      };

      postsContainer.appendChild(postDiv);
    });
  };

  postForm.addEventListener("submit", e => {
    e.preventDefault();
    posts.push({
      title: postTitleInput.value,
      content: postContentInput.value,
      date: new Date().toLocaleString(),
      likes: 0
    });
    savePosts();
    postForm.reset();
    displayPosts();
  });

  searchInput.addEventListener("input", e => {
    displayPosts(e.target.value);
  });

  clearAllBtn.onclick = () => {
    if (confirm("Sab delete kare?")) {
      posts = [];
      savePosts();
      displayPosts();
    }
  };

  modeToggleBtn.onclick = () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode");
    modeToggleBtn.innerText = isDarkMode ? "Light Mode" : "Dark Mode";
  };

  document.addEventListener("DOMContentLoaded", displayPosts);
})();
