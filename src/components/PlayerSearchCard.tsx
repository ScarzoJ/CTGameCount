import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";

import { getSearchSummoner, getSummonerByQueue } from "../services/api/ct";
import { SummonerByQueueData } from "../types/api/ct/searchSummonerByQueue";
import { SummonerData } from "../types/api/ct/searchSummoner";

const PlayerSearchCard = () => {

  const [summonerFound, setSummonerFound] = useState(false)
  const [showData, setShowData] = useState(false)
  const [lookupDone, setLookupDone] = useState(false)
  const [summoner, setSummoner] = useState('')
  const [tagline, setTagline] = useState('')
  let [seasonGames, setSeasonGames] = useState<{ seasonData: SummonerByQueueData; seasonId: number; seasonName: string; }[]>([])
  const seasons = [
    {
      seasonId: 31,
      seasonName: 'Season 2025 S1 S1',
    },
    {
      seasonId: 29,
      seasonName: 'Season 2024 S3',
    },
    {
      seasonId: 27,
      seasonName: 'Season 2024 S2',
    },
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

  interface SeasonsData {
    seasonData: SummonerByQueueData;
    seasonId: number;
    seasonName: string;
  }

  const seasonsData = seasons.map((season) => {
    return { ...season, seasonData: {} as SummonerByQueueData };
  }) as SeasonsData[]

  const resetGames = () => {
    seasonGames = []
    setSeasonGames([] as { seasonData: SummonerByQueueData; seasonId: number; seasonName: string; }[])
  }

  const summonerLookup = () => {
    resetGames()
    setSummonerFound(false)
    getSearchSummoner(summoner, tagline)
      .then((data) => {
        const summonerInfo = data.data.find((summonerInfo) => {
          return (summonerInfo.game_name.toLowerCase() === summoner.toLowerCase())
            && (summonerInfo.tagline.toLowerCase() === tagline.toLowerCase());
        })
        setLookupDone(true)

        if (summonerInfo) {
          const seasonsPromiseArray = seasons.map((season, index) => {
            return new Promise<void>((resolve, reject) => {
              getSummonerByQueue(summonerInfo!.summoner_id, 'SOLORANKED', season.seasonId)
                .then((seasonData) => {
                  const seasonEntry = { ...seasonsData[index], seasonData: seasonData.data }
                  seasonGames.push(seasonEntry)
                  setSeasonGames(seasonGames)
                  return resolve()
                }).catch(() => {
                  return reject()
                }).finally(() => {
                })
            })
          })

          Promise.all(seasonsPromiseArray)
            .then(() => {
              setSummonerFound(true)
              setShowData(true)
            })
            .finally(() => {
              const sortedGames = seasonGames.sort((a, b) => {
                return a.seasonId - b.seasonId
              })
              setSeasonGames(sortedGames)
            })

        }
      })
  }



  interface SeasonInfoProps {
    season: {
      seasonData: SummonerByQueueData;
      seasonId: number;
      seasonName: string;
    }
  }

  const SeasonTooltip = ({ season }: SeasonInfoProps) => {
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

  const handleSearch = () => {
    summonerLookup()
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Container>
            <TextField label="Summoner" variant="filled" onChange={(e) => {
              setSummoner(e.target.value)
              setSummonerFound(false)
              setLookupDone(false)
            }}
            />
            <TextField label="Tag" variant="filled" onChange={(e) => {
              setTagline(e.target.value)
              setSummonerFound(false)
              setLookupDone(false)
            }}
            />
            <Button onClick={() => handleSearch()}>Search</Button>
            {lookupDone && (summonerFound ? (
              <Typography>
                Summoner Name Encontrado
              </Typography>
            ) : (
              <Typography>
                Summoner Name No Encontrado
              </Typography>
            ))
            }
          </Container>
          {summonerFound && showData && (
            <Container>
              <Typography variant="h5" >
                Summoner: {summoner}#{tagline}
              </Typography>
              <Typography variant="h5" >
                Total Games: {seasonGames.reduce((accumulator, season) => {
                  return accumulator + (season.seasonData.play || 0)
                }, 0)}
              </Typography>
              {seasonGames.map((season, index) => {
                return (
                  <Container>
                    <SeasonTooltip key={index} season={season} />
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