import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogList } from "../assets/config/blogdata";
import Footer from "../components/footer";
import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const selectedBlog = blogList.find((item) => item.id === parseInt(id));
    if (selectedBlog) {
      setBlog(selectedBlog);
    }
  }, [id]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 2,
          backgroundColor: "rgba(224, 205, 194, 0.3)",
          marginBottom: 3,
        }}
      >
        {blog && (
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              marginBottom: "20px",
              borderRadius: "8px",
              position: "relative",
              alignSelf: "center",
            }}
          >
            <img
              src={blog.cover}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-70px",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                zIndex: 1,
              }}
            >
              <img
                src={blog.authoricon}
                alt={blog.author}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "5px solid rgba(224, 205, 194, 0.3)",
                }}
              />
              <Typography
                variant="subtitle2"
                align="center"
                color="textSecondary"
                mt={1}
              >
                {blog.author}
              </Typography>
            </div>
          </Box>
        )}
        {blog && (
          <section
            style={{ width: "100%", maxWidth: "800px", alignSelf: "center" }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              fontFamily="monospace"
              fontWeight="bold"
              color="#4D1F08"
              mt={2}
              marginTop={8}
            >
              {blog.title}
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              color="#4D1F08"
              fontFamily="sans"
              mb={2}
            >
              {blog.desc}
            </Typography>
            {blog.sections && blog.sections.length > 0 && (
              <>
                {blog.sections.map((section, index) => (
                  <div key={index}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontFamily="monospace"
                      fontWeight="bold"
                      color="#4D1F08"
                    >
                      {section.heading}
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      fontFamily="sans"
                      color="#4D1F08"
                    >
                      {section.content}
                    </Typography>
                  </div>
                ))}
              </>
            )}
            {blog.id === 1 && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontFamily="monospace"
                  fontWeight="bold"
                  color="#4D1F08"
                >
                  Ready to turn your vision into reality? Connect with us on
                </Typography>
                <Link
                  href="https://www.instagram.com/rosa.evo/"
                  target=""
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{
                    color: "#be9269",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#685043",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Instagram
                </Link>{" "}
                or through{" "}
                <Link
                  href="tel:+9100021321312"
                  color="primary"
                  sx={{
                    color: "#be9269",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#685043",
                      textDecoration: "underline",
                    },
                  }}
                >
                  WhatsApp
                </Link>
                <section>
                  <Typography
                    variant="body2"
                    paragraph
                    fontFamily="sans"
                    color="#4D1F08"
                  >
                    Our team is excited to embark on this creative journey with
                    you and craft a resin masterpiece that is uniquely yours.
                  </Typography>
                </section>
              </>
            )}
            <Typography
              variant="subtitle2"
              align="right"
              color="textSecondary"
              mt={2}
            >
              {blog.date}
            </Typography>
          </section>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Blog;
