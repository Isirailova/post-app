import React, { useEffect, useState } from "react";
import "./postApp.style.css";

const getUrl = "https://jsonplaceholder.typicode.com/users/1/posts";
const postUrl = "https://jsonplaceholder.typicode.com/posts";

const defaultData = {
  id: "",
  title: "",
  body: "",
};

const PostApp = () => {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState(defaultData);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch(getUrl);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const writePost = async () => {
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(singlePost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();
      setPosts([data, ...posts]);
    } catch (err) {
      console.log("error", err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    writePost();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSinglePost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Posts:</h1>
      <form onSubmit={onSubmit}>
        <input
          name="title"
          value={singlePost.title}
          placeholder="Put title"
          onChange={onChangeHandler}
        ></input>
        <input
          name="body"
          value={singlePost.body}
          placeholder="Tell your thought"
          onChange={onChangeHandler}
        ></input>
        <button type="submit">POST</button>
      </form>
      {posts.map((el) => (
        <div key={el.id}>
          <h3>{el.title}</h3>
          <p>{el.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostApp;
