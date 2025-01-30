import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import PlayerSearchCard from "./PlayerSearchCard";
import GHLogo from "../assets/github-mark.svg"

const BasePage = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CT Game Count
          </Typography>
          <img
            src={GHLogo}
            alt="Github"
            height={"24px"}
            width={"24px"}
            onClick={() => window.open("https://github.com/ScarzoJ/CTGameCount/tree/gh-pages", "Github")}
            style={{cursor:"pointer"}}
          />
        </Toolbar>
      </AppBar>
      <Box>
        <Grid container>
          <Grid item xs={5}>
            <PlayerSearchCard />
          </Grid>
          <Grid item xs={5}>
            <PlayerSearchCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BasePage