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
      <div className="flex flex-col justify-center items-center w-screen min-h-screen px-4 text-9xl text-black">
        Blog
      </div>
    </StandardLayout>
  );
};

export default BlogPage;
