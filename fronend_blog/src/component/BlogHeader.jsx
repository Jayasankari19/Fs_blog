import React from "react";
import { AppWindowMac, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

const BlogHeader = () => {
  return (
    <div className="w-full bg-red-100 p-4">
      <nav className="max-w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <AppWindowMac />
          <span>BlogLists</span>
        </div>
        <ul className="flex items-center gap-8 text-lg font-semibold">
          <li>
            <Link to="/" className="cursor-pointer">Home</Link>
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <CirclePlus />
            <Link to="/createpost">Create Post</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BlogHeader;

