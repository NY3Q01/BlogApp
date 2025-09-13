

// Helper for random avatar
function randomAvatar() {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${Math.floor(Math.random()*10000)}`;
}

const examplePosts = {
  Blogging: [
    {
      title: "How to Start a Blog in 2025",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      content: "Learn the step-by-step process to launch your own blog, from choosing a platform to writing your first post."
    },
    {
      title: "Best Blogging Platforms Compared",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      content: "We review the top blogging platforms so you can find the best fit for your style and goals."
    },
    {
      title: "Writing Engaging Content: Tips & Tricks",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      content: "Discover proven techniques to keep your readers coming back for more."
    }
  ],
  Tech: [
    {
      title: "Top 5 Tech Trends in 2025",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      content: "Explore the latest technology trends that are shaping the future."
    },
    {
      title: "How AI is Changing the World",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      content: "A look at artificial intelligence and its impact on society."
    },
    {
      title: "Best Laptops for Creators",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      content: "Our picks for the best laptops for bloggers, designers, and developers."
    }
  ],
  Travel: [
    {
      title: "10 Must-Visit Destinations in 2025",
      image: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5?auto=format&fit=crop&w=600&q=80",
      content: "Plan your next adventure with these top travel spots."
    },
    {
      title: "Traveling on a Budget",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      content: "Tips for seeing the world without breaking the bank."
    },
    {
      title: "How to Pack Like a Pro",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      content: "Packing hacks for efficient and stress-free travel."
    }
  ],
  Food: [
    {
      title: "Easy Weeknight Dinners",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      content: "Delicious and quick recipes for busy evenings."
    },
    {
      title: "The Art of Baking Bread",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      content: "Step-by-step guide to baking your own bread at home."
    },
    {
      title: "Exploring World Cuisines",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      content: "A culinary journey through different cultures."
    }
  ],
  Lifestyle: [
    {
      title: "Minimalism: Living with Less",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      content: "How to simplify your life and focus on what matters."
    },
    {
      title: "Morning Routines for Success",
      image: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5?auto=format&fit=crop&w=600&q=80",
      content: "Start your day right with these healthy habits."
    },
    {
      title: "Work-Life Balance Tips",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      content: "Strategies for balancing your career and personal life."
    }
  ]
};


let posts = [];
// Load all example posts for all categories on Discover
Object.keys(examplePosts).forEach(cat => {
  examplePosts[cat].forEach(post => {
    posts.push({
      ...post,
      category: cat,
      author: ["Alex","Sam","Jordan","Taylor","Morgan"][Math.floor(Math.random()*5)],
      avatar: randomAvatar(),
      tags: [cat],
      likes: Math.floor(Math.random()*20),
      comments: [],
      featured: Math.random() < 0.1 // 10% chance to be featured
    });
  });
});


const container = document.getElementById("blog-container");
const featuredSection = document.getElementById("featured-post");
const recentList = document.getElementById("recent-posts-list");
const popularList = document.getElementById("popular-posts-list");
const loadMoreBtn = document.getElementById("load-more");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let postsPerPage = 6;
let currentPage = 1;
let currentFilter = "All";
let currentSearch = "";

function renderFeatured() {
  if (!featuredSection) return;
  const featured = posts.find(p => p.featured);
  if (featured) {
    featuredSection.innerHTML = `
      <div class="featured-card">
        <img src="${featured.image}" alt="Featured image">
        <div class="featured-content">
          <h2>${featured.title}</h2>
          <p>${featured.content}</p>
          <span class="featured-badge">Editor's Pick</span>
        </div>
      </div>
    `;
  } else {
    featuredSection.innerHTML = "";
  }
}

function renderPosts(filter = "All", search = "", page = 1) {
  container.innerHTML = "";
  let filtered = posts.filter(post =>
    (filter === "All" || post.category === filter) &&
    (search === "" || post.title.toLowerCase().includes(search.toLowerCase()) || post.content.toLowerCase().includes(search.toLowerCase()) || (post.tags && post.tags.join(",").toLowerCase().includes(search.toLowerCase())))
  );
  const start = 0;
  const end = page * postsPerPage;
  filtered.slice(start, end).forEach((post, idx) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <div class="post-header">
        <img src="${post.avatar || randomAvatar()}" class="avatar" alt="avatar">
        <span class="author">${post.author || "Anonymous"}</span>
        <span class="category">${post.category}</span>
      </div>
      <img src="${post.image}" alt="Post image">
      <h2>${post.title}</h2>
      <div class="tags">${(post.tags||[]).map(t=>`<span class='tag'>#${t}</span>`).join(' ')}</div>
      <p>${post.content}</p>
      <div class="post-actions">
        <button class="like-btn" data-idx="${posts.indexOf(post)}">❤️ ${post.likes||0}</button>
        <button class="share-btn" data-title="${encodeURIComponent(post.title)}" data-url="${window.location.href}">🔗 Share</button>
      </div>
      <div class="comments">
        <h4>Comments</h4>
        <ul class="comments-list">
          ${(post.comments||[]).map(c=>`<li><b>${c.author}:</b> ${c.text}</li>`).join('')}
        </ul>
        <form class="comment-form" data-idx="${posts.indexOf(post)}">
          <input type="text" placeholder="Your name" required class="comment-author">
          <input type="text" placeholder="Add a comment..." required class="comment-text">
          <button type="submit">Add</button>
        </form>
      </div>
    `;
    container.appendChild(article);
  });
  // Like buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.onclick = function() {
      const idx = +btn.getAttribute('data-idx');
      posts[idx].likes = (posts[idx].likes||0) + 1;
      renderPosts(currentFilter, currentSearch, currentPage);
      renderPopular();
    };
  });
  // Share buttons
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.onclick = function() {
      const title = decodeURIComponent(btn.getAttribute('data-title'));
      const url = btn.getAttribute('data-url');
      navigator.clipboard.writeText(`${title} - ${url}`);
      btn.textContent = '✅ Copied!';
      setTimeout(()=>btn.textContent='🔗 Share', 1200);
    };
  });
  // Comment forms
  document.querySelectorAll('.comment-form').forEach(form => {
    form.onsubmit = function(e) {
      e.preventDefault();
      const idx = +form.getAttribute('data-idx');
      const author = form.querySelector('.comment-author').value || 'Anonymous';
      const text = form.querySelector('.comment-text').value;
      posts[idx].comments = posts[idx].comments || [];
      posts[idx].comments.push({author, text});
      renderPosts(currentFilter, currentSearch, currentPage);
    };
  });
}

function renderRecent() {
  if (!recentList) return;
  recentList.innerHTML = '';
  posts.slice(0,5).forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="return false;">${post.title}</a>`;
    recentList.appendChild(li);
  });
}

function renderPopular() {
  if (!popularList) return;
  popularList.innerHTML = '';
  posts.slice().sort((a,b)=>b.likes-(a.likes||0)).slice(0,5).forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="return false;">${post.title}</a>`;
    popularList.appendChild(li);
  });
}

// Blog post form
const blogForm = document.getElementById("blog-form");
if (blogForm) {
  blogForm.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById("blog-title").value;
    const image = document.getElementById("blog-image").value || "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80";
    const content = document.getElementById("blog-content").value;
    const category = document.getElementById("blog-category").value;
    const author = document.getElementById("blog-author").value || "Anonymous";
    const tags = document.getElementById("blog-tags").value.split(',').map(t=>t.trim()).filter(Boolean);
    posts.unshift({ title, image, content, category, author, avatar: randomAvatar(), tags, likes: 0, comments: [] });
    renderPosts(currentFilter, currentSearch, currentPage);
    renderRecent();
    blogForm.reset();
  };
}

// Category filter
const categoryFilter = document.getElementById("category-filter");
if (categoryFilter) {
  categoryFilter.onchange = function() {
    currentFilter = categoryFilter.value;
    currentPage = 1;
    renderPosts(currentFilter, currentSearch, currentPage);
  };
}

// Search bar
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.oninput = function() {
    currentSearch = searchInput.value;
    currentPage = 1;
    renderPosts(currentFilter, currentSearch, currentPage);
  };
}

// Load more
if (loadMoreBtn) {
  loadMoreBtn.onclick = function() {
    currentPage++;
    renderPosts(currentFilter, currentSearch, currentPage);
  };
}

// Dark mode
if (darkModeToggle) {
  // Set initial state from localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
  darkModeToggle.onchange = function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  };
}

renderFeatured();
renderPosts();
renderRecent();
renderPopular();



renderPosts();
