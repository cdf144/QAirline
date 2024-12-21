import React from "react";
import StandardLayout from "../layouts/Standard";

interface BlogInfo {
  title: string;
  body: string;
  category: string;
}

const BlogPage: React.FC = () => {
  return (
    <StandardLayout>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen px-4 text-9xl text-black">
        Blog
      </div>
    </StandardLayout>
  );
};

export default BlogPage;
