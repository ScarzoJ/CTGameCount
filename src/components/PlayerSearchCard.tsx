import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";

import { getSearchSummoner, getSummonerByQueue } from "../services/api/ct";
import { SummonerByQueueData } from "../types/api/ct/searchSummonerByQueue";
import { SummonerData } from "../types/api/ct/searchSummoner";

const PlayerSearchCard = () => {

  const [hasSummonerInfo, setHasSummonerInfo] = useState(false)
  const [summonerInfo, setSummonerInfo] = useState<SummonerData>()
  const [summoner, setSummoner] = useState('')
  const [tagline, setTagline] = useState('')
  const seasonGames = useMemo(() => [0], [])
  const seasons = [
    {
      seasonId: 25,
      seasonName: 'Season 2024 S1',
    },
    {
      seasonId: 23,
      seasonName: 'Season 2023 S2',
    },
    {
      seasonId: 21,
      seasonName: 'Season 2023 S1',
    },
    {
      seasonId: 19,
      seasonName: 'Season 2022',
    }
  ]
  const handleSearch = () => {
    setHasSummonerInfo(false)
    getSearchSummoner(summoner, tagline).then((data) => {
      setSummonerInfo(data.data.find((summonerInfo) => {
        return (summonerInfo.game_name.toLowerCase() === summoner.toLowerCase())
          && (summonerInfo.tagline.toLowerCase() === tagline.toLowerCase());
      }))
    }).finally(() => {
      setHasSummonerInfo(true)
    })
  }
  interface SeasonInfoProps {
    season: {
      seasonId: number;
      seasonName: string;
    }
  }

  const SeasonInfo = ({ season }: SeasonInfoProps) => {
    const [seasonData, setSeasonData] = useState<SummonerByQueueData>()
    const [showData, setShowData] = useState(false)
    useEffect(() => {
      setShowData(false)
      getSummonerByQueue(summonerInfo!.summoner_id, 'SOLORANKED', season.seasonId).then((sData) => {
        seasonGames.push(sData.data.play)
        setSeasonData(sData.data)
      }).finally(() => {
        setShowData(true)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <Container>
        <Typography variant="h5">
          {season.seasonName}
        </Typography>
        {showData && seasonData && !isEmpty(seasonData) ? (
          <>
            <Typography variant="h6">
              SoloQs Played: {seasonData.play}
            </Typography>
            <Typography variant="body1">
              Wins: {seasonData.win}
            </Typography>
            <Typography variant="body1">
              Lose: {seasonData.lose}
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

  useEffect(() => {
    setHasSummonerInfo(false)
    setSummoner('')
    setTagline('')
    setSummonerInfo(undefined)
  }, [])

  return (
    <Box>
      <Card>
        <CardContent>
          <Container>
            <TextField label="Summoner" variant="filled" onChange={(e) => {
              setSummoner(e.target.value)
              setHasSummonerInfo(false)
            }}
            />
            <TextField label="Tag" variant="filled" onChange={(e) => {
              setTagline(e.target.value)
              setHasSummonerInfo(false)
            }}
            />
            <Button onClick={() => handleSearch()}>Search</Button>
          </Container>
          {hasSummonerInfo && (
            <Container>
              <Typography variant="h5" >
                Summoner: {summoner}#{tagline}
              </Typography>
              {seasons.map((season, index) => {
                return (
                  <Container>
                    <SeasonInfo key={index} season={season} />
                  </Container>
                )
              })}
            </Container>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default PlayerSearchCard