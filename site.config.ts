import { siteConfig } from './lib/site-config.ts'
import locale from './site.locale.json'

export default siteConfig({
  notionDbIds: [],

  // basic site info (required)
  name: 'HAcapital',
  domain: 'noxionite.vercel.app',
  author: 'Jaewan Shin',

  // open graph metadata (optional)
  description: 'Accounting and Tax Services',

  // DNS record for domain verification (optional)
  dnsRecord: '_QZy3wmjCIgdXI6R_HH1kRLcZJR5OkAUDRj3NiMGKxs',

  // hero section (optional)
  heroAssets: [],

  // author metadata (optional)
  authors: [
    {
      name: 'Jaewan Shin',                       // Author name
      avatar_dir: '/authors/Jzahnny.jpeg',   // Author avatar image path in public folder (28px x 28px recommended)
      home_url: 'https://jzahnny.vercel.app/',   // Author home URL
    }
  ],

  // social links, the order is preserved.
  socials: {
    linkedin: 'alemem64', // optional linkedin username
    twitter: 'alemem64', // optional twitter username
    // github: 'alemem64',  // optional github username
    // youtube: 'channel/UCV7iVbVip33wD_rsiQLSubg?si=Tf0bKAPvtDY_J833', // optional youtube channel id eg. channel/UCXXXXXXXXXXXXXXXXXXXXXX
    // instagram: 'alemem64', // optional instagram username
    // tiktok: '#', // optional tiktok username
    // threads: '#', // optional threads username
    // facebook: '#',  // optional facebook profile id on profile page eg. 1000XXXXXXXXXXX
    // mastodon: '#', // optional mastodon profile URL, provides link verification
    // newsletter: '#' // optional personal newsletter URL
  },

  // locale configuration
  locale,

  // Incremental Static Regeneration (ISR) configuration
  isr: {
    revalidate: 3600 // revalidate time in seconds
  }
})
