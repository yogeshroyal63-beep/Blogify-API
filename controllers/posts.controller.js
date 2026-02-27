// Temporary in-memory storage (Module 2 only)
let posts = [
  { id: 1, title: "First Post", content: "This is the first post" },
  { id: 2, title: "Second Post", content: "This is the second post" }
];

// GET /posts
export const getAllPosts = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: posts
  });
};

// GET /posts/:id
export const getPostById = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  res.status(200).json({
    success: true,
    data: post
  });
};

// POST /posts
export const createPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required"
    });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content
  };

  posts.push(newPost);

  res.status(201).json({
    success: true,
    data: newPost
  });
};

// PUT /posts/:id
export const updatePost = (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  post.title = title || post.title;
  post.content = content || post.content;

  res.status(200).json({
    success: true,
    data: post
  });
};

// DELETE /posts/:id
export const deletePost = (req, res, next) => {
  const { id } = req.params;
  const index = posts.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  posts.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully"
  });
};