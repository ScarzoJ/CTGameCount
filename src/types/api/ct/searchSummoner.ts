export interface SearchSummoner {
  data: SummonerData[]
}

export interface SummonerData {
  id: number
  summoner_id: string
  acct_id: string
  puuid: string
  game_name: string
  tagline: string
  name: string
  internal_name: string
  profile_image_url: string
  level: number
  updated_at: string
  solo_tier_info: any
}
