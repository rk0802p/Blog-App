const { ObjectId } = require('mongodb');

const resolvers = {
  Query: {
    // Resolver to fetch all blog posts
    posts: async (_, { page = 1, limit = 10 }, { db }) => {
      try {
        const skip = (page - 1) * limit;
        const posts = await db.collection('posts')
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
        // Map MongoDB's _id to GraphQL's id and convert ObjectId to string
        return posts.map(post => ({
          id: post._id.toString(),
          ...post,
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch blog posts.');
      }
    },
    // Resolver to fetch a single blog post by ID
    post: async (_, { id }, { db }) => {
      try {
        // Find post by ObjectId
        const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
        // Map MongoDB's _id to GraphQL's id and convert ObjectId to string, return null if not found
        return post ? {
          id: post._id.toString(),
          ...post,
        } : null;
      } catch (error) {
        // Handle potential invalid ObjectId format error
        if (error.message.includes('Argument passed in must be a string of 12 bytes or a string of 24 hex characters')) {
          console.error(`Invalid ID format: ${id}`, error);
          // Return null for invalid ID format as per schema, or throw a user-friendly error
          return null;
        }
        console.error(`Error fetching post with ID ${id}:`, error);
        throw new Error(`Failed to fetch blog post with ID ${id}.`);
      }
    }
  },
  Mutation: {
    // Resolver to create a new blog post
    createPost: async (_, { title, content, author }, { db }) => {
      try {
        // Input validation
        if (!title || !content || !author) {
          throw new Error('All fields (title, content, author) are required.');
        }
        if (title.length < 3) {
          throw new Error('Title must be at least 3 characters long.');
        }
        if (content.length < 10) {
          throw new Error('Content must be at least 10 characters long.');
        }
        if (author.length < 2) {
          throw new Error('Author name must be at least 2 characters long.');
        }
        const post = {
          title,
          content,
          author,
          createdAt: new Date().toISOString()
        };
        
        // Insert the new post into the database
        const result = await db.collection('posts').insertOne(post);
        // Return the newly created post with stringified id
        return {
          id: result.insertedId.toString(),
          ...post
        };
      } catch (error) {
        console.error('Error creating post:', error);
        throw new Error(error.message || 'Failed to create blog post.');
      }
    }
  }
};

module.exports = resolvers; 