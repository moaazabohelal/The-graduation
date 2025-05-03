# Google Analytics Setup for Tracking Search Terms

## Overview
This guide will help you set up Google Analytics to track visitors who find your site through the following search terms:
- تخرج مدارس الانجاز 1446
- تخرج 1446
- graduation 1446
- alinjaz graduation 1446

## Step 1: Create a Google Analytics 4 Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Follow the account setup wizard

## Step 2: Add Your Website as a Property
1. Create a new property (Admin → Create Property)
2. Enter your property name: "Alinjaz Graduation 1446"
3. Select your reporting time zone and currency
4. Click "Next"

## Step 3: Add a Data Stream
1. Select "Web" as your platform
2. Enter your website URL: `https://alinjazschool.com/graduation1446/`
3. Give your stream a name: "Graduation Website"
4. Click "Create stream"

## Step 4: Install the Tracking Code
1. Copy the provided Google tag (G-XXXXXXXX)
2. Add it to your website by inserting this script just before the closing `</head>` tag in index.html:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXX');
</script>
```

## Step 5: Set Up Search Term Tracking
1. In Google Analytics, go to Admin → Data Streams → Your Web Stream
2. Click "Configure tag settings"
3. Under "Enhanced Measurement," make sure "Site search" is enabled
4. Save your changes

## Step 6: Create Custom Reports for Keyword Tracking
1. Navigate to "Reports" → "Explorations" → "Create"
2. Select "Blank exploration"
3. For Dimensions, add "Session source" and "Session medium"
4. For Metrics, add "Sessions," "New users," and "Conversions"
5. Create filters for organic search traffic
6. Save this report as "Search Keywords Performance"

## Step 7: Link Google Search Console
1. Go to Admin → Property Settings
2. Under "Product linking," click "Search Console linking"
3. Follow the steps to link your Search Console property
4. This will provide data on which search terms bring visitors to your site

## Step 8: Set Up Conversion Goals
Create goals to track important user interactions:
1. Go to Admin → Events → Create Event
2. Set up events for actions like:
   - Form submissions
   - Project ratings
   - Project views
   - Lightbox interactions

## Step 9: Monitor Search Term Performance
After setup is complete (allow 24-48 hours for data collection):
1. Go to Acquisition → Traffic Acquisition
2. Filter for "Organic Search" as the source
3. Look for traffic from searches related to your keywords
4. In the linked Search Console reports, look specifically for:
   - تخرج مدارس الانجاز 1446
   - تخرج 1446
   - graduation 1446
   - alinjaz graduation 1446

## Step 10: Optimize Based on Data
Use the collected data to improve your site:
1. Identify which search terms bring the most visitors
2. See which pages these visitors view most
3. Determine if certain search terms have higher bounce rates
4. Optimize content based on these insights

## Additional Information
- It may take 1-2 weeks to collect meaningful data
- For more detailed tracking, consider setting up Google Tag Manager
- Mobile and desktop performance can be compared in the "Technology" reports 