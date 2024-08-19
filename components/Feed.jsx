"use client";

import { useState, useEffect } from "react";
import PromptCard from "@/components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);

  // Handle Search By Prompt/Tag/Username
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce Method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  // Filtering by Prompt/Tag/Username
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleTagClick = (tagName) => {
    if (!tagName.startsWith("#")) {
      setSearchText(tagName);
    } else {
      setSearchText(tagName.slice(1));
    }

    setSearchResults(filterPrompts(tagName));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          name="search"
          placeholder="Search for a tag or a username..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
