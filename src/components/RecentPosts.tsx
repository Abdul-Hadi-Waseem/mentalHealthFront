import { blogs } from "../constants/constants";

const RecentPosts = () => {
  return (
    <div className="text-center py-3 px-4 search__box mt-4">
      <h5>Recent Post</h5>
      <hr
        className="my-4"
        style={{ width: "100%", opacity: "0.1", borderBottom: "1px" }}
      />

      {blogs.slice(0, 3).map((blog) => (
        <div key={blog.id} className="d-flex align-items-center pb-4">
          <img
            src={blog.image}
            alt={blog.title}
            height={80}
            width={100}
            style={{ borderRadius: "4px" }}
          />
          <div className="d-flex flex-column text-start ps-3">
            <span className="blog__detail__name" style={{ fontSize: "16px" }}>
              {blog.title}
            </span>
            <span className="blog__detail__extras" style={{ fontSize: "14px" }}>
              {blog.date} — 3 minutes read
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
