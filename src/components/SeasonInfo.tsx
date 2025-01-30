import { Container, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { SummonerByQueueData } from "../types/api/ct/searchSummonerByQueue";

interface SeasonInfoProps {
  season: {
    seasonData: SummonerByQueueData;
    seasonId: number;
    seasonName: string;
  }
}

export const SeasonInfo = ({ season }: SeasonInfoProps) => {
  return (
    <Container>
      <Typography variant="h5">
        {season.seasonName}
      </Typography>
      {!isEmpty(season.seasonData) ? (
        <>
          <Typography variant="h6">
            SoloQs Played: {season.seasonData.play}
          </Typography>
          <Typography variant="body1">
            Wins: {season.seasonData.win}
          </Typography>
          <Typography variant="body1">
            Lose: {season.seasonData.lose}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">
          No Games
        </Typography>
      )
      }
    </Container>
  )
}