import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../components/Common/Heading";
import "./Blogs.css";
import BlogArchive from "../../components/BlogArchive";
import { blogs, contributors } from "../../constants/constants";
import Slider from "react-slick";

function Blog() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
{
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <Heading title="Blogs" />
      <Container className="pb-5">
        <h3 className="text-center blogs__featured pb-4">
          Featured <span className="txt__green">posts</span>
        </h3>
        <Slider {...settings}>
          {blogs.map((blog) => {
            return (
              <Col lg={3} key={blog.id}>
                <BlogArchive
                  date={blog.date}
                  description={blog.description}
                  image={blog.image}
                  title={blog.title}
                  writer={blog.writer}
                  showButton={false}
                  showDescription={false}
                />
              </Col>
            );
          })}
        </Slider>
        <Row className="mt-4">
          <Col lg={8}>
            <h2 className="py-4">
              Recent <span className="txt__green">posts</span>
            </h2>
            <Row className="g-2">
              {blogs.slice(0, 4).map((blog) => {
                return (
                  <Col lg={6} key={blog.id} className="mb-4">
                    <BlogArchive
                      date={blog.date}
                      description={blog.description}
                      image={blog.image}
                      title={blog.title}
                      writer={blog.writer}
                      showButton={true}
                      showDescription={true}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col className="bg-white px-4 pt-5" style={{ borderRadius: "12px" }}>
            <h5 style={{ fontWeight: "600" }}>
              Recent <span className="txt__green">Contributors</span>
            </h5>
            <hr
              className="my-4"
              style={{ width: "100%", opacity: "0.1", borderBottom: "1px" }}
            />
            <div className="d-flex flex-column">
              {contributors.map((contributor) => {
                return (
                  <div
                    className="d-flex g-3 mb-4 align-items-center"
                    key={contributor.id}
                  >
                    <div className="d-flex flex-column ps-3">
                      <span className="contributor__name">
                        {contributor.name}
                      </span>
                      <span className="contributor__articles">
                        {contributor.articles} Articles
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Blog;
