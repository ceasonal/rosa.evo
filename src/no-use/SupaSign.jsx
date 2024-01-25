import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createClient } from "@supabase/supabase-js";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import CssBaseline from "@mui/material/CssBaseline";
import Imagetest from "../assets/images/test1.jpg";
import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from "react-router-dom";

const Supasign = () => {

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={2}
        md={7}
        sx={{
          backgroundImage: `url(${Imagetest})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: "#E9D7CC",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: 3,
          }}
        >
          <CssBaseline />
          <Avatar
            src="https://cdn.discordapp.com/attachments/1140959205986148372/1182970787058171924/words.png?ex=65a251e6&is=658fdce6&hm=c35868b3947f2f328a5cbd2f5f9ea562303ace8ec82c6c0189867fd672f0ba89&"
            sx={{ m: 2, width: 100, height: 100 }}
          />
          {/* Use the Auth component for authentication */}
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
            }}
            providers={[]}
            onAuthStateChange={handleAuthStateChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Supasign;
