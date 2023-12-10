// alternative slider ( not responsive )
// import React, { useRef, useState } from "react";
// import { Container, IconButton, Typography, Avatar, Box} from "@mui/material";
// import Rating from '@mui/material/Rating';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";


// const topComments = [
//     {
//       id: 1,
//       user: {
//         name: "yveltal",
//         avatar: "https://source.unsplash.com/50x50/?person",
//         social: {
//           instagram: "https://instagram.com/johndoe",
//         },
//     },
//     comment: "Very Epic Products! Must buy.",
//     value:5
// },
// {
//     id: 2,
//       user: {
//         name: "Jane Smith",
//         avatar: "https://source.unsplash.com/50x50/?person",
//         social: {
//           instagram: "https://instagram.com/janesmith",
//         },
//     },
//     comment: "Very Epic Products! Must buy.",
//     value: 4.5
// },
// {
//     id: 3,
//       user: {
//         name: "John Doe",
//         avatar: "https://source.unsplash.com/50x50/?man",
//         social: {
//           instagram: "https://instagram.com/janesmith",
//         },
//     },
//     comment: "Very Epic Products! Must buy.",
//     value: 4
// },
// {
//   id: 4,
//     user: {
//       name: "catto",
//       avatar: "https://source.unsplash.com/50x50/?person",
//       social: {
//         instagram: "https://instagram.com/janesmith",
//       },
//   },
//   comment: "Very Epic Products! Must buy.",
//   value: 5
// },
// {
//   id: 5,
//     user: {
//       name: "Zoro",
//       avatar: "https://source.unsplash.com/50x50/?man",
//       social: {
//         instagram: "https://instagram.com/janesmith",
//       },
//   },
//   comment: "Very Epic Products! Must buy.",
//   value: 4
// },
// {
//   id: 6,
//     user: {
//       name: "Nami",
//       avatar: "https://source.unsplash.com/50x50/?person",
//       social: {
//         instagram: "https://instagram.com/janesmith",
//       },
//   },
//   comment: "Very Epic Products! Must buy.",
//   value: 4.5
// },
// ];

// const CommentSlider = () => {
//   const sliderRef = useRef(null);
//   const commentsPerPage = 3;
//   const [activePage, setActivePage] = useState(0);

//   const handlePrevClick = () => {
//     setActivePage((prevPage) => Math.max(prevPage - 1, 0));
//   };

//   const handleNextClick = () => {
//     setActivePage((prevPage) => Math.min(prevPage + 1, Math.ceil(topComments.length / commentsPerPage) - 1));
//   };

//   const handleDotClick = (page) => {
//     setActivePage(page);
//   };

//   const startIndex = activePage * commentsPerPage;
//   const endIndex = startIndex + commentsPerPage;
//   const visibleComments = topComments.slice(startIndex, endIndex);

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 5,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           width: "100%",
//           marginBottom: 2,
//         }}
//       >
//         <IconButton onClick={handlePrevClick} disabled={activePage === 0}>
//           <KeyboardArrowLeftIcon />
//         </IconButton>
//         <Box
//           ref={sliderRef}
//           sx={{
//             display: "flex",
//             overflowX: "hidden",
//             scrollBehavior: "smooth",
//             flexDirection: "row",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           {visibleComments.map((comment) => (
//             <Box
//               key={comment.id}
//               sx={{
//                 flex: 1,
//                 minWidth: "300px",
//                 padding: 2,
//                 margin: 1,
//                 borderRadius: 5,
//                 backgroundColor: "white",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Avatar src={comment.user.avatar} alt={comment.user.name} sx={{ marginBottom: 1 }} />
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: 2,
//                 }}
//               >
//                 <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                   {comment.user.name}
//                 </Typography>
//                 <IconButton
//                   component="a"
//                   href={comment.user.social.instagram}
//                   target="_blank"
//                   sx={{ marginLeft: 1 }}
//                 >
//                   <InstagramIcon />
//                 </IconButton>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: 2,
//                 }}
//               >
//                 <Rating name="read-only" value={comment.value} readOnly precision={0.5} />
//               </Box>
//               <Typography variant="body2">{comment.comment}</Typography>
//             </Box>
//           ))}
//         </Box>
//         <IconButton onClick={handleNextClick} disabled={activePage === Math.ceil(topComments.length / commentsPerPage) - 1}>
//           <KeyboardArrowRightIcon />
//         </IconButton>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           marginTop: 2,
//         }}
//       >
//         {[...Array(Math.ceil(topComments.length / commentsPerPage)).keys()].map((page) => (
//           <IconButton
//             key={page}
//             onClick={() => handleDotClick(page)}
//             color={page === activePage ? "primary" : "default"}
//           >
//             •
//           </IconButton>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default CommentSlider;



