/* **************** EMUMS ****************** */
export enum Paths {
  ROOT = '/',
  PRICE_SIMULATION = '/price-simulation'
}

export enum Environments {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export enum PostMessageEvents {
  ROUTE_NAVIGATE = 'RouteNavigate'
}

export enum WebStorageKeys {
  SESSION_DATA = 'PRICING_DASHBOARD_SESSION_DATA'
}

/* **************** TYPES ****************** */
export type ThemeModes = 'light'|'dark';

/* **************** INTERFACES ****************** */
export interface ISessionStorageData {
  USER_TOKEN: string,
  SELECTED_MERCHANT: string,
  THEME_MODE: ThemeModes,
  isAuthenticated: boolean
}

/* **************** CONSTS ****************** */
