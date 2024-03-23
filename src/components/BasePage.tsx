import { Box, Grid } from "@mui/material";
import PlayerSearchCard from "./PlayerSearchCard";

const BasePage = () => {
  return (
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
  );
}

export default BasePage