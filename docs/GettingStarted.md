## Fork

First things first, fork this project to your own repo.

## Configure Supabase

Start a new [Supabase project](https://supabase.io/), don't worry — it will be [free](https://supabase.io/pricing) for the volume we'll be using.

## Gather your API Keys

You'll need your API keys from:

- [ConvertKit](https://app.convertkit.com/account/edit)
- [Revue](https://www.getrevue.co/app/integrations)
- Supabase (go to Settings -> API -> API Keys )

## Configure your Vercel project

We need to add link our repo to a Vercel project to deploy it. We also need to configure our API keys as Vercel secrets.

Go to your Vercel dashboard, click "New Project", and provide your git repository.

Once you have your project created, we need to add secrets.

As you're creating the project, open the "Environment Variables" section.

Add each of these variables:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- REVUE_API_KEY
- CONVERTKIT_API_KEY
- CONVERTKIT_FORM_ID

## Deploy

Once everything is configured, we can press deploy.

## Configure cron jobs

These different endpoints need to be hit once every 5-15 minutes, your choice. I'm defaulting to 5 so that any sequences start in a timely fashion after being added to ConvertKit.

This will be the URL from your deployment.

Cron jobs can be configured simply with GitHub Actions [(source)](https://vercel.com/docs/solutions/cron-jobs).

```
name: 5-minute-cron
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  cron:
    runs-on: ubuntu-latest
    steps:
      - name: Call our API route
        run: |
          curl --request POST \
          --url 'https://yoursite.com/api/cron' \
```

We need on of these for each endpoint:

- /api/subapase-to-convertkit
- /api/sync-revue-subscribers

## Warning: no error logging by default

Vercel does not automatically keep track of errors. Given that Sentry.io just rolled out a Next.js library for monitoring Next.js apps, I'd recommend signing up with their free tier ASAP.
