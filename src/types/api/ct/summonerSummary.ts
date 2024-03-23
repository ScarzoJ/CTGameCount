export interface SummonerSummary {
  data: SummonerSummaryData
}

export interface SummonerSummaryData {
  summoner: Summoner
  recent_game_stats: RecentGameStat[]
}

export interface Summoner {
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
  renewable_at: string
  previous_seasons: PreviousSeason[]
  league_stats: LeagueStat[]
  most_champions: MostChampions
}

export interface PreviousSeason {
  season_id: number
  tier_info: TierInfo
  created_at: string
}

export interface TierInfo {
  tier: string
  division: number
  lp: number
  level: any
  tier_image_url: string
  border_image_url: string
}

export interface LeagueStat {
  queue_info: QueueInfo
  tier_info: TierInfo
  win?: number
  lose?: number
  is_hot_streak: boolean
  is_fresh_blood: boolean
  is_veteran: boolean
  is_inactive: boolean
  series: any
  updated_at?: string
}

export interface QueueInfo {
  id: number
  queue_translate: string
  game_type: string
}


export interface MostChampions {
  game_type: string
  season_id: number
  play: number
  win: number
  lose: number
  champion_stats: ChampionStat[]
}

export interface ChampionStat {
  id: number
  play: number
  win: number
  lose: number
  kill: number
  death: number
  assist: number
  gold_earned: number
  minion_kill: number
  turret_kill: number
  neutral_minion_kill: number
  damage_dealt: number
  damage_taken: number
  physical_damage_dealt: number
  magic_damage_dealt: number
  most_kill: number
  max_kill: number
  max_death: number
  double_kill: number
  triple_kill: number
  quadra_kill: number
  penta_kill: number
  game_length_second: number
  inhibitor_kills: number
  sight_wards_bought_in_game: number
  vision_wards_bought_in_game: number
  vision_score: number
  wards_placed: number
  wards_killed: number
  heal: number
  time_ccing_others: number
  op_score: number
  is_max_in_team_op_score: number
  physical_damage_taken: number
  damage_dealt_to_champions: number
  physical_damage_dealt_to_champions: number
  magic_damage_dealt_to_champions: number
  damage_dealt_to_objectives: number
  damage_dealt_to_turrets: number
  damage_self_mitigated: number
  max_largest_multi_kill: number
  max_largest_critical_strike: number
  max_largest_killing_spree: number
}

export interface RecentGameStat {
  game_id: string
  champion_id: number
  kill: number
  death: number
  assist: number
  position: string
  is_win: boolean
  is_remake: boolean
  op_score: number
  op_score_rank: number
  is_opscore_max_in_team: boolean
  created_at: string
}
