import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { socialIcons } from "../../constants/constants";
import BlogImage from "../../assets/images/blog_image.png";
import CommentForm from "../../components/Forms/CommentForm";
import SearchComponent from "../../components/Search";
import RecentPosts from "../../components/RecentPosts";
import StayInTouch from "../../components/StayInTouch";
import { blogs } from "../../constants/constants";
function BlogDetails() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const id = parseInt(blogId, 10);
    const selectedBlog = blogs.find((blog) => blog.id === id);
    setBlog(selectedBlog);
    scrollToTop();
  }, [blogId]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container className="blog__detail">
      <Row className="g-5">
        <Col lg={8}>
          {blog ? ( // Check if blog is not null before rendering
            <>
              <h2>{blog.title}</h2>
              <Row className="align-items-center justify-content-between py-3">
                <Col className="d-flex align-items-center">
                  <span className="d-flex flex-column">
                    <h5 className="blog__detail__name">{blog.writer}</h5>
                    <h5 className="blog__detail__extras">
                      {blog.date} | 2 Min Read
                    </h5>
                  </span>
                </Col>
                <Col className="social__icons d-flex justify-content-end">
                  {socialIcons.map((socialIcon) => {
                    return (
                      <a key={socialIcon.id} href={socialIcon.link}>
                        <img src={socialIcon.src} alt={socialIcon.name} />
                      </a>
                    );
                  })}
                </Col>
              </Row>
              <img src={BlogImage} className="w-100" />
              <h5 className="pt-5 pb-3">{blog.title}</h5>
              <p className="pb-3">{blog.description}</p>
              <h5 style={{ fontWeight: "500" }}>Comments</h5>
              <CommentForm />
            </>
          ) : (
            <p>Loading...</p> // You can add a loading message or spinner here
          )}
        </Col>
        <Col>
          <SearchComponent />
          <RecentPosts />
          <StayInTouch />
        </Col>
      </Row>
    </Container>
  );
}

export default BlogDetails;
