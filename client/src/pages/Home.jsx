import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showFullText, setShowFullText] = useState(false); // state variable to keep track of whether full text should be displayed

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const shortText = doc.body.textContent.substring(0, length); // shorten text to specified length
    return showFullText ? doc.body.textContent : shortText; // if showFullText is true, return full text, otherwise return short text
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc, 100)}</p> {/* specify the length of the shortened text */}
              <Link className="link" to={`/post/${post.id}`}>
                {showFullText ? (
                  <button>Read Less</button>
                ) : (
                  <button onClick={() => setShowFullText(true)}>Read More</button>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;
