import axiosInstance from "../instance";

const BlogAPI = {
  GetBlogs: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/blogs", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  },
  AddBlog: async (blogData) => {
    try {
      const response = await axiosInstance.post("/blogs", blogData);
      return response.data;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  },
  UpdateBlog: async (blogData) => {
    try {
      // Ensure the API endpoint matches what the backend expects
      const response = await axiosInstance.put("/blogs", blogData);
      return response.data;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  },
  DeleteBlog: async (blogId) => {
    try {
      const response = await axiosInstance.delete(`/blogs/${blogId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  },
  GetBlogCategories: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/blog-categories", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching blog categories:", error);
    }
  },
  AddBlogCategory: async (blogCategoryData) => {
    try {
      const response = await axiosInstance.post(
        "/blog-categories",
        blogCategoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding blog category:", error);
    }
  },
  UpdateBlogCategory: async (blogCategoryData) => {
    try {
      const response = await axiosInstance.put(
        "/blog-categories",
        blogCategoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating blog category:", error);
    }
  },
  GetBlogCategoriesById: async (blogCategoryId) => {
    try {
      const response = await axiosInstance.get(
        `/blog-categories/${blogCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching blog category by ID:", error);
    }
  },
  DeleteBlogCategory: async (blogCategoryId) => {
    try {
      const response = await axiosInstance.delete(
        `/blog-categories/${blogCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting blog category:", error);
    }
  },
  uploadToFirebase: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosInstance.post("/firebase/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  searchBlog: async (searchQuery, pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/blogs", {
        params: {
          searchTerm: searchQuery,
          "page-index": pageIndex,
          "page-size": pageSize,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching blog:", error);
      throw error;
    }
  },
  searchBlogCategory: async (searchQuery, pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/blog-categories", {
        params: {
          searchTerm: searchQuery,
          "page-index": pageIndex,
          "page-size": pageSize,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching blog category:", error);
      throw error;
    }
  },
};
export default BlogAPI;
