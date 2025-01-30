import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { getSearchSummoner, getSummonerByQueue } from "../services/api/ct";
import { SummonerByQueueData } from "../types/api/ct/searchSummonerByQueue";
import { SeasonInfo } from "./SeasonInfo";

import OPGGSeasons from "../utils/opggSeasonMapping.json";

const PlayerSearchCard = () => {
  const [summonerFound, setSummonerFound] = useState(false);
  const [showData, setShowData] = useState(false);
  const [lookupDone, setLookupDone] = useState(false);
  const [summoner, setSummoner] = useState("");
  const [tagline, setTagline] = useState("");
  let [seasonGames, setSeasonGames] = useState<
    { seasonData: SummonerByQueueData; seasonId: number; seasonName: string }[]
  >([]);

  const seasons = OPGGSeasons;

  interface SeasonsData {
    seasonData: SummonerByQueueData;
    seasonId: number;
    seasonName: string;
  }

  const seasonsData = seasons.map((season) => {
    return { ...season, seasonData: {} as SummonerByQueueData };
  }) as SeasonsData[];

  const resetGames = () => {
    seasonGames = [];
    setSeasonGames(
      [] as {
        seasonData: SummonerByQueueData;
        seasonId: number;
        seasonName: string;
      }[],
    );
  };

  const summonerLookup = () => {
    resetGames();
    setSummonerFound(false);
    getSearchSummoner(summoner, tagline).then((data) => {
      const summonerInfo = data.data.find((summonerInfo) => {
        return (
          summonerInfo.game_name.toLowerCase() === summoner.toLowerCase() &&
          summonerInfo.tagline.toLowerCase() === tagline.toLowerCase()
        );
      });
      setLookupDone(true);

      if (summonerInfo) {
        const seasonsPromiseArray = seasons.map((season, index) => {
          return new Promise<void>((resolve, reject) => {
            getSummonerByQueue(
              summonerInfo!.summoner_id,
              "SOLORANKED",
              season.seasonId,
            )
              .then((seasonData) => {
                const seasonEntry = {
                  ...seasonsData[index],
                  seasonData: seasonData.data,
                };
                seasonGames.push(seasonEntry);
                setSeasonGames(seasonGames);
                return resolve();
              })
              .catch(() => {
                return reject();
              })
              .finally(() => {});
          });
        });

        Promise.all(seasonsPromiseArray)
          .then(() => {
            setSummonerFound(true);
            setShowData(true);
          })
          .finally(() => {
            const sortedGames = seasonGames.sort((a, b) => {
              return a.seasonId - b.seasonId;
            });
            setSeasonGames(sortedGames);
          });
      }
    });
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Container>
            <TextField
              label="Nombre"
              variant="filled"
              onChange={(e) => {
                setSummoner(e.target.value);
                setSummonerFound(false);
                setLookupDone(false);
              }}
            />
            <TextField
              label="#"
              variant="filled"
              onChange={(e) => {
                setTagline(e.target.value);
                setSummonerFound(false);
                setLookupDone(false);
              }}
            />
            <Button onClick={() => summonerLookup()}>Search</Button>
            {lookupDone &&
              (summonerFound ? (
                <Typography>Nombre de Invocador Encontrado</Typography>
              ) : (
                <Typography>Nombre de Invocador No Encontrado</Typography>
              ))}
          </Container>
          {summonerFound && showData && (
            <Container>
              <Typography variant="h5">
                Nombre de Invocador: {summoner}#{tagline}
              </Typography>
              <Typography variant="h5">
                Partidas totales:{" "}
                {seasonGames.reduce((accumulator, season) => {
                  return accumulator + (season.seasonData.play || 0);
                }, 0)}
              </Typography>
              {seasonGames.map((season, index) => {
                return (
                  <Container>
                    <SeasonInfo key={index} season={season} />
                  </Container>
                );
              })}
            </Container>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlayerSearchCard;
