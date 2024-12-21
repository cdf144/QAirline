import React, { useEffect, useState } from "react";
import StandardLayout from "../layouts/Standard";

interface BlogInfo {
  title: string;
  body: string;
  category: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogInfo[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          new URL("/v1/blog", import.meta.env.VITE_API_BASE_URL).toString(),
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data);
        console.log("Fetched blogs:", data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <StandardLayout>
      <div className="flex flex-col justify-start items-center w-screen min-h-screen px-4 text-black">
        <h1 className="text-3xl font-bold mb-4">Blogs</h1>
        {blogs.length > 0 ? (
          <div className="w-full max-w-4xl space-y-4">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow bg-white"
              >
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Category: {blog.category}
                </p>
                <p className="text-gray-700">{blog.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg">Loading blogs...</p>
        )}
      </div>
    </StandardLayout>
  );
};

export default BlogPage;
