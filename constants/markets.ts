export const MARKETS = {
  india: {
    id: 'india',
    label: 'India',
    flag: '🇮🇳',
    currency: '₹',
    indices: [
      { ticker: '^NSEI',    name: 'NIFTY 50'   },
      { ticker: '^BSESN',   name: 'SENSEX'     },
      { ticker: '^NSEBANK', name: 'BANK NIFTY' },
    ],
    sectors: ['IT', 'Banking', 'Realty', 'Metal', 'Pharma', 'Energy'],
    exchange: 'NSE/BSE',
    regulator: 'SEBI',
    newsKeywords: ['NSE', 'BSE', 'SEBI', 'RBI', 'Nifty', 'Sensex', 'India market'],
    lessonPath: 'india',
  },
  eu: {
    id: 'eu',
    label: 'Europe',
    flag: '🇪🇺',
    currency: '€',
    indices: [
      { ticker: '^GDAXI',    name: 'DAX'          },
      { ticker: '^FCHI',     name: 'CAC 40'        },
      { ticker: '^AEX',      name: 'AEX'           },
      { ticker: '^STOXX50E', name: 'EURO STOXX 50' },
    ],
    sectors: ['Auto', 'Luxury', 'Finance', 'Energy', 'Industrial', 'Tech'],
    exchange: 'Xetra/Euronext',
    regulator: 'ESMA/ECB',
    newsKeywords: ['ECB', 'DAX', 'eurozone', 'EU market', 'European stocks'],
    lessonPath: 'eu',
  },
  us: {
    id: 'us',
    label: 'United States',
    flag: '🇺🇸',
    currency: '$',
    indices: [
      { ticker: '^GSPC', name: 'S&P 500'   },
      { ticker: '^IXIC', name: 'NASDAQ'    },
      { ticker: '^DJI',  name: 'Dow Jones' },
    ],
    sectors: ['Tech', 'Finance', 'Healthcare', 'Energy', 'Consumer', 'Industrial'],
    exchange: 'NYSE/NASDAQ',
    regulator: 'SEC/Fed',
    newsKeywords: ['S&P 500', 'Fed', 'NASDAQ', 'Wall Street', 'US market'],
    lessonPath: 'us',
  },
} as const;

export type MarketId = keyof typeof MARKETS;
