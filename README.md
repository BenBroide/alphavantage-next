# Alpha Vantage Stock Dashboard

🔗 **[Live Demo](https://alphavantage-next.vercel.app/)**

A modern Next.js application for tracking and analyzing stock market data using the Alpha Vantage API.

> **Note on API Limitations**: This app uses 2 Alpha Vantage API keys to work around the free tier's 1-second-per-call rate limit, enabling faster concurrent requests. Additionally, S3 caching with a 7-day fallback is implemented to handle the 25 calls per day limit, ensuring reliable data availability even when API quotas are exceeded.

## AWS S3 Setup with Terraform

To enable S3 caching, deploy the AWS infrastructure using Terraform:

### Prerequisites
- Install [Terraform](https://www.terraform.io/downloads)
- Configure AWS credentials:
  ```bash
  aws configure
  # Or set environment variables:
  export AWS_ACCESS_KEY_ID="your-access-key"
  export AWS_SECRET_ACCESS_KEY="your-secret-key"
  export AWS_DEFAULT_REGION="us-east-1"
  ```

### Deployment Steps

1. **Navigate to terraform directory**
   ```bash
   cd terraform
   ```

2. **Initialize Terraform**
   ```bash
   terraform init
   ```

3. **Review the plan**
   ```bash
   terraform plan
   ```

4. **Apply the configuration**
   ```bash
   terraform apply
   ```
   Type `yes` when prompted.

5. **Get the credentials**
   ```bash
   terraform output
   # For secret access key:
   terraform output iam_secret_access_key
   ```

6. **Add credentials to `.env.local`**
   Use the outputs to configure your environment variables (see Getting Started section).

See [terraform/README.terraform.md](terraform/README.terraform.md) for detailed documentation.

## Features

- **Stock Market Data**: View detailed information for 15 major stocks
- **Interactive Charts**: Visualize price trends with Chart.js
- **Company Insights**: Access comprehensive company overviews including financials and key metrics
- **Historical Data**: Browse 100 days of historical price data
- **Responsive Design**: Optimized for desktop and mobile devices
- **S3 Caching**: AWS S3 integration for efficient data caching with 7-day fallback
- **Multiple View Modes**: Cards, tiles, and table views for stock listings

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Chart.js with react-chartjs-2
- **Cloud Storage**: AWS S3 (for caching)
- **Testing**: Jest, React Testing Library
- **Runtime**: React 19
- **Deployment**: Vercel

## Prerequisites

- Node.js 20 or later
- npm or yarn
- Alpha Vantage API key(s) - [Get free API key](https://www.alphavantage.co/support/#api-key)
- AWS account (optional, for S3 caching)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BenBroide/alphavantage-next.git
cd alphavantage-next
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# IMPORTANT: Do NOT use NEXT_PUBLIC_ prefix - keeps API keys server-side only
ALPHAVANTAGE_API_KEY=your_api_key_here
ALPHAVANTAGE_API_KEY_2=your_second_api_key_here

# Optional: AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_bucket_name
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint

## Project Structure

```
alphavantage-next/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── stock/[symbol]/   # Stock data endpoint
│   ├── stock/[symbol]/       # Stock detail pages
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── __tests__/           # Component tests
│   ├── StockCard.tsx        # Stock card component
│   ├── PriceChart.tsx       # Chart component
│   └── ...
├── lib/                     # Utility functions
│   ├── __tests__/          # Utility tests
│   ├── alphavantage-api.ts # API service
│   ├── cache-service.ts    # Caching logic
│   ├── s3-service.ts       # AWS S3 operations
│   └── formatters.ts       # Data formatting
├── types/                  # TypeScript types
├── public/                 # Static assets
└── terraform/             # Infrastructure as Code (optional)
```

## Testing

### Unit Tests

```bash
npm test
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

## API Rate Limits

Alpha Vantage free tier allows:
- 25 requests per day
- 5 requests per minute

The app implements S3 caching to minimize API calls and includes a 7-day cache fallback mechanism.

## Features in Detail

### Caching Strategy

1. **Today's Cache**: First checks for data cached today
2. **API Fetch**: If no cache, fetches fresh data from Alpha Vantage
3. **7-Day Fallback**: On rate limit/error, retrieves most recent cache (up to 7 days old)
4. **S3 Storage**: All data is cached in S3 for persistence

### View Modes

- **Cards View**: Large cards with company logos
- **Tiles View**: Compact grid layout
- **Table View**: Dense table format with sorting

## License

MIT License

## Acknowledgments

- Stock data provided by [Alpha Vantage](https://www.alphavantage.co/)
- Company logos from [Clearbit Logo API](https://clearbit.com/logo)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
