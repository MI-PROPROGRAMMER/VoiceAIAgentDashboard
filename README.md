This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tag System

The conversation system uses a structured tag system with three categories:

### Category 1: Call Type (One Required)
- **appointment** - Call was about booking an appointment
- **handoff** - Call needs human callback/follow-up
- **general** - General inquiry call

### Category 2: Completion Status (One Required)
- **call completed** - Call finished successfully
- **call incomplete** - Call not finished

### Category 3: Appointment Status (Only if Category 1 = "appointment")
- **confirmed** - Appointment confirmed
- **pending** - Awaiting confirmation
- **rescheduled** - Appointment was rescheduled

### Tag Structure Examples
- `["appointment", "call completed", "confirmed"]` - Appointment call that finished and was confirmed
- `["appointment", "call completed", "pending"]` - Appointment call that finished but awaiting confirmation
- `["handoff", "call incomplete"]` - Handoff call that didn't finish
- `["general", "call completed"]` - General query call that finished

Every call must have exactly one tag from Category 1 and one tag from Category 2. If Category 1 is "appointment", then one tag from Category 3 must also be included.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
