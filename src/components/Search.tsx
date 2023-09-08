import { useState } from "react";
import { Form } from "react-bootstrap";
import { blogs } from "../constants/constants";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

interface IBlogs {
  id: number;
  description: string;
  image: string;
  title: string;
  date: string;
  writer: string;
}

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedBlogs, setSuggestedBlogs] = useState<IBlogs[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filter blogs based on search query
    const filteredBlogs = blogs.filter(
      (blog, index, self) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) &&
        self.findIndex((b) => b.title === blog.title) === index
    );

    setSuggestedBlogs(filteredBlogs);
  };

  return (
    <div className="text-center py-3 px-4 search__box">
      <h5>Search</h5>
      <hr
        className="my-4"
        style={{ width: "100%", opacity: "0.1", borderBottom: "1px" }}
      />
      <Form>
        <Form.Group controlId="search">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaSearch />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search Articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Form.Group>
      </Form>

      {searchQuery && suggestedBlogs.length > 0 && (
        <div className="bg-white p-2 search__result shadow">
          {suggestedBlogs.map((blog) => (
            <Link
              to={"/blog-detail"}
              key={blog.id}
              className="d-flex align-items-center"
              style={{ color: "#000" }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <span>{blog.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
