import { SearchSummoner } from "../../../types/api/ct/searchSummoner";
import { SummonerByQueue } from "../../../types/api/ct/searchSummonerByQueue";
import { SummonerStats } from "../../../types/api/ct/summonerStats";
import { SummonerSummary } from "../../../types/api/ct/summonerSummary";

const opggIBURL = "https://op.gg/api/v1.0/internal/bypass";
const opggLOLIBURL = "https://lol-web-api.op.gg/api/v1.0/internal/bypass";

const headers = {};

// Disabled starting 2025
const getProxy = (url: string) => {
  return `https://corsproxy.io/?${encodeURIComponent(url)}`;
};

export const getSearchSummoner = async (gameName: string, tagline: string) => {
  return await fetch(
    `${opggIBURL}/summoners/v2/euw/autocomplete?gameName=${encodeURIComponent(gameName)}&tagline=${tagline}`,
    {
      method: "GET",
      headers: headers,
    },
  ).then(async (data) => {
    return (await data.json()) as SearchSummoner;
  });
};

export const getSummonerStats = async (
  puuid: string,
  queueType: string,
  seasonId: number,
) => {
  return await fetch(
    `${opggIBURL}/summoners/euw/${puuid}/most-champions/${queueType}?season_id=${seasonId}`,
    {
      method: "GET",
      headers: headers,
    },
  ).then(async (data) => {
    return (await data.json()) as SummonerStats;
  });
};

export const getSummonerSummary = async (puuid: string) => {
  return await fetch(`${opggIBURL}/summoners/euw/${puuid}/summary`, {
    method: "GET",
    headers: headers,
  }).then(async (data) => {
    return (await data.json()) as SummonerSummary;
  });
};

export const getSummonerByQueue = async (
  summoner_id: string,
  gameType: string,
  seasonId: number,
) => {
  return await fetch(
    `${opggLOLIBURL}/summoners/euw/${summoner_id}/most-champions/rank?game_type=${gameType}&season_id=${seasonId}`,
    {
      method: "GET",
      headers: headers,
    },
  ).then(async (data) => {
    return (await data.json()) as SummonerByQueue;
  });
};
