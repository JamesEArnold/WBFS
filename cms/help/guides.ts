/**
 * How-to guides shown in the admin at /admin/help (and linked from the
 * dashboard). Written for people with no technical background: everyday words,
 * one action per step, and the exact words shown on screen in **bold**.
 *
 * Screenshots (`image`) live in public/admin-help/<name>.jpg and are produced by
 * `npm run docs:help-screenshots`, which performs these steps in a real admin, so
 * the buttons named here are checked to exist.
 */

export type Step = {
  /** What to do. Wrap on-screen words in **double stars**. */
  text: string;
  /** Extra explanation under the step. */
  detail?: string;
  /** Screenshot name in public/admin-help (without .jpg). */
  image?: string;
  tip?: string;
};

export type Part = { heading?: string; intro?: string; steps: Step[] };

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: Category;
  minutes: number;
  adminsOnly?: boolean;
  beforeYouStart?: string[];
  parts: Part[];
  checkYourWork?: string[];
  troubleshooting?: { problem: string; fix: string }[];
  related?: string[];
};

export const CATEGORIES = ['Getting started', 'Pages', 'Events', 'Whole site', 'Photos & files', 'People & help'] as const;
export type Category = (typeof CATEGORIES)[number];

/** Shown on the dashboard: the things people do most. */
export const POPULAR_GUIDES = ['getting-started', 'change-words', 'change-photo', 'add-event', 'update-event', 'announcement-banner'];

const PUBLISH_REMINDER =
  'Nothing you type is visible to the public until you click **Publish changes**. Until then your changes are saved privately as you type.';

export const GUIDES: Guide[] = [
  {
    slug: 'getting-started',
    title: 'Start here: finding your way around',
    summary: 'Log in, find the page you want, see your changes as you type, and put them live.',
    category: 'Getting started',
    minutes: 5,
    beforeYouStart: [
      'You need your email address and password. The first time, an admin sends you a one-time setup link to choose your password.',
      'A computer or tablet works best. A phone works too, but the screen is small.',
    ],
    parts: [
      {
        heading: 'Log in',
        steps: [
          {
            text: 'Go to **weisburnforsheriff.com/admin** in your web browser.',
            detail: 'Tip: bookmark this page so it is easy to find next time.',
          },
          {
            text: 'Type your **Email** and **Password**, then click **Login**.',
            image: 'getting-started-1',
            tip: 'Forgot your password? Ask an admin. They can send you a new link in a few seconds.',
          },
        ],
      },
      {
        heading: 'Find your way around',
        steps: [
          {
            text: 'After logging in you see the home screen. These guides are at the top, then **Quick actions** for the most common jobs (like **Post a new event**). Underneath is everything you can change.',
            image: 'getting-started-2',
            detail:
              '**Pages** holds each page of the website (Home, About, Donate, In Office, Events Page) plus any **Custom Pages** you create. **Events & Photos** holds your events and every photo and PDF. **Settings** holds the banner, menu and footer, and the list of people who can log in.',
          },
          {
            text: 'Click the **☰** button at the top left any time to open the menu on the left side.',
            detail: 'The menu has the same sections, so you can jump straight to any page.',
          },
        ],
      },
      {
        heading: 'Edit, preview and publish',
        intro: 'Every page works the same way.',
        steps: [
          {
            text: 'Open a page, for example **Home**. The form is on the left and a live preview of the real page is on the right.',
            image: 'getting-started-3',
          },
          {
            text: 'The form is split into tabs, one for each part of the page, in the same order as the page: **Top of page**, **Portrait**, **Photo gallery** and so on. Click a tab to see its boxes.',
            image: 'getting-started-tabs',
            detail:
              'Boxes you rarely need, like the small gold lines, are folded away under **More options** at the bottom of a tab. Click **More options** to open it.',
          },
          {
            text: 'The quickest way to find a box: click the words or photo you want to change in the preview. The form opens the right tab, flashes the box gold and puts your cursor in it.',
            image: 'getting-started-click',
            detail: 'When you point at something in the preview, a gold dotted outline and **✎ Click to edit** show what you’re about to open.',
          },
          {
            text: 'Change something in the form. The preview on the right updates within a second.',
            detail: PUBLISH_REMINDER,
          },
          {
            text: 'To check how the page looks on a phone, use the size menu above the preview (it says **Responsive** at first) and choose **Phone**. Choose **Desktop** to go back.',
            image: 'getting-started-4',
          },
          {
            text: 'When you are happy, click **Publish changes** at the top right. Your changes are on the website within about 10 seconds.',
            image: 'getting-started-5',
          },
        ],
      },
    ],
    checkYourWork: [
      'Open the website in a new tab and look at the page you changed. If you still see the old version, refresh the page after a few seconds.',
    ],
    troubleshooting: [
      {
        problem: 'The preview on the right is missing.',
        fix: 'Click the eye button next to **Publish changes**. It shows and hides the preview.',
      },
      {
        problem: 'It says my account is locked.',
        fix: 'After 5 wrong passwords the account locks for 10 minutes. Wait, or ask an admin to unlock it (**Force Unlock**) or send you a new password link.',
      },
    ],
    related: ['change-words', 'undo-a-mistake'],
  },

  {
    slug: 'change-words',
    title: 'Change the words on a page',
    summary: 'Fix a typo, rewrite a paragraph or update a heading on Home, About, Donate, In Office or the Events page.',
    category: 'Pages',
    minutes: 3,
    parts: [
      {
        steps: [
          {
            text: 'On the home screen, under **Pages**, click the page you want to change, for example **About**.',
            image: 'change-words-1',
          },
          {
            text: 'In the preview on the right, click the words you want to change.',
            image: 'change-words-2',
            detail:
              'The form jumps to the box that holds those words, flashes it gold and puts your cursor in it. You can also find it yourself: the tabs above the form follow the page from top to bottom.',
          },
          {
            text: 'Type your new words.',
            detail: 'The preview on the right updates as you type.',
          },
          {
            text: 'Click **Publish changes** at the top right.',
            detail: 'The change is on the website within about 10 seconds.',
          },
        ],
      },
      {
        heading: 'Good to know',
        steps: [
          {
            text: '**Small gold line:** type only the words. The stars (★) on each side are added for you. Most gold lines are under **More options** at the bottom of their tab, because they rarely change.',
          },
          {
            text: '**Headline** and **Headline — gold second line:** big headlines have a white first line and an optional gold second line.',
          },
          {
            text: 'To make a few words stand out, put two stars on each side, like this: `Are **YOU** with me?`',
            detail:
              'Only boxes that say “Wrap words in **double stars**” support this. The page shows those words highlighted in the style of that section (for example the gold “YOUR” on the About page).',
          },
          {
            text: 'Lists, such as the years on the In Office page (**Year by year** tab) or the starred list on Home, have an **Add** button underneath (for example **Add Line**) for a new row. Drag the dotted handle on a row to move it, and use the **⋯** button on a row to remove it.',
            image: 'change-words-3',
          },
        ],
      },
    ],
    checkYourWork: ['Look at the page on the website and read your change once more, on a phone too if you can.'],
    troubleshooting: [
      {
        problem: 'The **Publish changes** button is grey.',
        fix: 'There are no new changes to publish. Make a change first, or wait a moment for it to save.',
      },
      {
        problem: 'A box has a red message under it.',
        fix: 'That box is required or has something it can’t accept. Read the message, fix the box, then publish again. A tab with a problem shows a red mark, so check the tabs too.',
      },
      {
        problem: 'Clicking the preview doesn’t jump anywhere.',
        fix: 'Some things, like the sign-up forms and the menu, aren’t changed on this page. The menu, header and footer are in **Site Settings**.',
      },
    ],
    related: ['change-photo', 'change-button', 'add-section'],
  },

  {
    slug: 'change-photo',
    title: 'Change a photo on a page',
    summary: 'Swap a photo on the Home or About page, or in a section, for a new or existing one.',
    category: 'Pages',
    minutes: 4,
    beforeYouStart: [
      'Have the photo saved on your computer or phone (JPEG, PNG, WebP or HEIC, up to 25 MB). Photos straight from a phone are fine. They are resized automatically.',
    ],
    parts: [
      {
        steps: [
          {
            text: 'Open the page (for example **About**) and click the photo in the preview. The form jumps to its photo box, which shows a small picture of the current photo.',
            image: 'change-photo-1',
          },
          {
            text: 'Click the **×** on the right of the current photo to remove it from this spot.',
            detail: 'This only takes it off this page. The photo stays in **Photos & Files** in case you want it again.',
          },
          {
            text: 'To use a photo you already uploaded, click **Choose from existing** and click the photo you want.',
            image: 'change-photo-2',
          },
          {
            text: 'To upload a new photo, click **Create New**, then drag your photo into the box (or click **Select a file**).',
            image: 'change-photo-3',
          },
          {
            text: 'Fill in **Description (alt text)**: a short sentence describing the photo, for example “Sheriff Weisburn greeting families at the 2025 parade”. Then click **Save**.',
            detail:
              'This description is read aloud to people who can’t see the screen, and search engines use it too. It is required.',
          },
          {
            text: 'Check the preview on the right, then click **Publish changes**.',
          },
        ],
      },
    ],
    checkYourWork: ['Look at the page on a phone. Photos are cropped to fit the design, so make sure nothing important (like a face) is cut off.'],
    troubleshooting: [
      {
        problem: 'The upload is refused.',
        fix: 'Only photos (JPEG, PNG, WebP, HEIC) and PDFs up to 25 MB are accepted. Shrink a very large photo or PDF and try again.',
      },
      {
        problem: 'The new photo is cropped badly.',
        fix: 'Open the photo in **Photos & Files**, click the spot you want kept in view (the “focal point”), and save. Or choose a photo with the subject nearer the middle.',
      },
    ],
    related: ['photos-and-files', 'change-words'],
  },

  {
    slug: 'change-button',
    title: 'Change a button or link',
    summary: 'Change what a button says, where it goes, or make it open a PDF.',
    category: 'Pages',
    minutes: 3,
    parts: [
      {
        steps: [
          {
            text: 'Open the page and click the button in the preview. The form jumps to its **Buttons** list. Click a button’s row (for example **Button 01**) to open it.',
            image: 'change-button-1',
          },
          {
            text: 'Change **Label**: the words on the button.',
          },
          {
            text: 'Under **Where it goes**, choose one:',
            detail:
              '**Web address / site path** goes to a page. Type it in **Link address**: a page on this site as `/donate` or `/events`, another website as `https://…`, or an email address as `mailto:name@example.com`. **Link to file** goes to an uploaded PDF. Choose the file instead of typing anything.',
            image: 'change-button-2',
          },
          {
            text: 'Pick the **Style**: **Solid gold** for the main button, **Gold outline** for a second one. Next to it, tick **Open in a new tab** if it goes to another website and you want people to stay on yours too.',
          },
          {
            text: 'Click **Publish changes**.',
          },
        ],
      },
    ],
    checkYourWork: ['On the website, click the button to make sure it goes where you expect.'],
    troubleshooting: [
      {
        problem: 'It says to choose “Link to file” instead.',
        fix: 'You pasted the address of an uploaded file. Choose **Link to file** and pick the file from the list, so the link keeps working.',
      },
      {
        problem: 'It says the link isn’t valid.',
        fix: 'Pages on this site start with a slash (`/about`). Other websites need the full address starting with `https://`.',
      },
    ],
    related: ['change-words', 'menu-header-footer'],
  },

  {
    slug: 'add-event',
    title: 'Add a new event',
    summary: 'Put a fundraiser, parade or appearance on the Events page in a minute: name, day and place are enough.',
    category: 'Events',
    minutes: 3,
    beforeYouStart: ['Have the name, the day, and the time and place. A short description and a flyer are optional.'],
    parts: [
      {
        heading: 'Post it with the quick form',
        steps: [
          {
            text: 'On the home screen, under **Quick actions**, click **Post a new event**.',
            image: 'add-event-1',
            detail: 'It is also at the top of the **Events** list.',
          },
          {
            text: 'Type the **Event name**, for example “Summer Picnic”, and pick the **Day of the event**.',
            image: 'add-event-2',
            detail: 'The preview on the right shows the top of the event’s page and its box on the Events list, and changes as you type.',
          },
          {
            text: 'Optional: type the **Time and place**, such as “1 PM · North Canton Park”, and a sentence or two in **About the event**.',
            detail: 'The Events list shows the date followed by the time and place, like “Saturday, June 5, 2027 · 1 PM · North Canton Park”.',
          },
          {
            text: 'Leave **Take it off the Events list after that day** ticked, so the event drops off the list by itself once it’s over.',
            detail: 'Its own page stays up for anyone who has the link.',
          },
          {
            text: 'Click **Publish now** to put it on the website straight away, or **Save as a draft** to finish it later.',
            detail: 'The event is on the Events page within about 10 seconds.',
          },
        ],
      },
      {
        heading: 'Add a flyer or buttons (optional)',
        intro: 'After you click, the full event form opens with a preview of the event’s page beside it.',
        steps: [
          {
            text: 'For a flyer, click the **Flyer** tab. Under **Flyer PDF**, click **Create New**, drag in the PDF (or click **Select a file**), type a short description such as “Printable picnic flyer”, and click **Save**.',
            image: 'add-event-3',
            detail: 'That’s all you need: the event’s page shows a gold **View the printable flyer** button that opens the PDF.',
          },
          {
            text: 'Optional: to show the flyer itself on the page, under **Flyer pictures** click **Add Flyer picture** and add a picture (JPG or PNG) of each page. Visitors click a picture to open the PDF.',
            detail: 'Put the PDF only in **Flyer PDF**. The pictures box takes pictures only.',
          },
          {
            text: 'For buttons like “RSVP” or “Sponsor”, stay on the **Basics** tab and click **Add Button**. See the guide on buttons and links.',
          },
          {
            text: 'Click **Publish changes** to put your additions live.',
          },
        ],
      },
      {
        heading: 'Filled in for you (change them if you like)',
        intro: 'These are under **More options** on the **Basics** tab. Leave them empty and the page uses sensible wording.',
        steps: [
          { text: '**Date line:** the gold line above the headline. Empty shows the date, like “Saturday · June 5, 2027”.' },
          { text: '**Headline** and **Headline — gold second line:** empty uses the event name. To split it in two colours, type “Summer” and “Picnic”.' },
          { text: '**Small gold line:** a few words above the name on the Events list, such as “Save The Date”.' },
          { text: '**Starred lines on the Events list:** click **Add Line** for short facts like the time, price or what’s included.' },
        ],
      },
    ],
    checkYourWork: [
      'Open weisburnforsheriff.com/events and check the event is listed.',
      'Click it and check its page, the buttons and the flyer.',
    ],
    troubleshooting: [
      {
        problem: 'It says there’s already an event with that name.',
        fix: 'Each event needs its own name, because the name becomes its web address. Add something to tell them apart, like the year: “Summer Picnic 2027”.',
      },
      {
        problem: 'My flyer doesn’t show on the event’s page.',
        fix: 'Check the PDF is in **Flyer PDF** on the **Flyer** tab (not under **Flyer pictures**), then click **Publish changes**. The page shows a **View the printable flyer** button, or your flyer pictures if you added them.',
      },
      {
        problem: 'The event isn’t on the Events page.',
        fix: 'Check that it was published (**Publish now**, or **Publish changes** in the full form), that **Status** on the right is **Upcoming** or **Sold out**, and that the **Remove from listings after** date hasn’t passed.',
      },
    ],
    related: ['update-event', 'feature-event', 'change-button'],
  },

  {
    slug: 'update-event',
    title: 'Mark an event sold out, finished, or remove it',
    summary: 'Show a “sold out” banner, take a finished event off the list, or remove an event completely.',
    category: 'Events',
    minutes: 3,
    parts: [
      {
        heading: 'Change the status',
        steps: [
          { text: 'Click **Events**, then click the event’s title.', image: 'update-event-1' },
          {
            text: 'On the right, change **Status**:',
            image: 'update-event-2',
            detail:
              '**Upcoming** is listed on the Events page. **Sold out** is still listed, and its page shows a gold banner (write the banner on the **Sold out** tab). **Past** comes off the Events list, but its page stays up for anyone with the link. **Hidden** takes its page off the website completely.',
          },
          { text: 'Click **Publish changes**.' },
        ],
      },
      {
        heading: 'Let it drop off by itself',
        steps: [
          {
            text: 'Set **Remove from listings after** (on the right) to the last day it should be listed, then click **Publish changes**.',
            detail:
              'From the next day it no longer shows on the Events page or the Home page. Its own page stays up. This happens within about an hour after midnight, with nothing else to do.',
          },
        ],
      },
      {
        heading: 'Take it off the website or delete it',
        steps: [
          {
            text: 'To take it off the website but keep it for later, click the **⋮** button at the top right and choose **Unpublish**.',
            image: 'update-event-3',
          },
          {
            text: 'To delete it for good, click **⋮**, choose **Delete**, and confirm.',
            detail: 'Deleting can’t be undone. If you might reuse it next year, unpublish it instead and change it later.',
          },
        ],
      },
    ],
    checkYourWork: ['Look at weisburnforsheriff.com/events to confirm the list looks right.'],
    related: ['add-event', 'feature-event'],
  },

  {
    slug: 'feature-event',
    title: 'Choose which event shows on the Home page',
    summary: 'Pick the event shown in the strip under the photo on the Home page, or hide the strip.',
    category: 'Events',
    minutes: 2,
    parts: [
      {
        steps: [
          { text: 'Under **Pages**, click **Home**, then click the **Featured event** tab.', image: 'feature-event-1' },
          {
            text: 'In **Event to feature**, choose the event from the list.',
            detail: 'The strip shows the event’s name and its date and place line, and links to its page.',
          },
          { text: 'To hide the strip, click the **×** in **Event to feature** to clear it.' },
          { text: 'Click **Publish changes**.' },
        ],
      },
    ],
    troubleshooting: [
      {
        problem: 'The strip isn’t showing.',
        fix: 'It only shows when the chosen event is published, isn’t **Hidden**, and its **Remove from listings after** date hasn’t passed.',
      },
    ],
    related: ['add-event', 'update-event'],
  },

  {
    slug: 'announcement-banner',
    title: 'Show an announcement banner across the site',
    summary: 'Put a short message, like “Rally Saturday — Details”, at the top of every page, and take it down again.',
    category: 'Whole site',
    minutes: 2,
    parts: [
      {
        steps: [
          { text: 'Under **Settings**, click **Site Settings**. The **Banner** tab is open.', image: 'announcement-banner-1' },
          { text: 'Tick **Show the announcement banner**.' },
          { text: 'Type the **Message**, for example “Rally this Saturday at 10 a.m.”.' },
          {
            text: 'Optional: add **Link text** (such as “Details”) and **Link address** (such as `/events`).',
          },
          {
            text: 'Click **Save**.',
            image: 'announcement-banner-2',
            detail: 'Site Settings has no draft step: saving puts the change live straight away, so check the spelling first.',
          },
          { text: 'To take the banner down, untick **Show the announcement banner** and click **Save**.' },
        ],
      },
    ],
    checkYourWork: ['Open any page of the website. The banner shows under the header.'],
    related: ['menu-header-footer'],
  },

  {
    slug: 'menu-header-footer',
    title: 'Change the menu, header or footer',
    summary: 'Add or reorder menu links, change the Donate button, or update the address, email and social links.',
    category: 'Whole site',
    minutes: 4,
    parts: [
      {
        heading: 'The menu and header',
        steps: [
          { text: 'Under **Settings**, click **Site Settings**, then the **Header** tab.', image: 'menu-header-footer-1' },
          {
            text: 'Under **Navigation menu**, each row is a link in the menu. Change a row’s **Label** (the words) or its link.',
          },
          {
            text: 'To add a link, click **Add Menu link**, type the **Label**, and type the page as a site path, for example `/meet-the-team`.',
            detail: 'New pages are not added to the menu by themselves. This is how you add them.',
          },
          { text: 'Drag the dotted handle on a row to change the order. Use **⋯** on a row to remove it.' },
          { text: '**Header button** is the gold button at the top right. **Mobile menu button** is the one inside the phone menu.' },
          { text: 'Click **Save**. Changes are live straight away.' },
        ],
      },
      {
        heading: 'The footer',
        steps: [
          {
            text: 'Click the **Footer** tab to change the short description, address, contact email, footer button, Facebook and Instagram links, and the “Paid for by…” line.',
            image: 'menu-header-footer-2',
          },
          { text: 'Click **Save**.' },
        ],
      },
    ],
    troubleshooting: [
      {
        problem: 'I removed something by mistake.',
        fix: 'Click **Versions** at the top of Site Settings to see earlier saves and restore one. See the guide on undoing mistakes.',
      },
    ],
    related: ['announcement-banner', 'new-page', 'undo-a-mistake'],
  },

  {
    slug: 'add-section',
    title: 'Add a new section to a page',
    summary: 'Add a photo with text, a gallery, a video, a quote or more to the bottom of any page or event.',
    category: 'Pages',
    minutes: 5,
    parts: [
      {
        steps: [
          {
            text: 'Open the page (for example **In Office**) and click the last tab, **Add more sections**.',
            detail: 'Events have the same tab. On a **Custom Page**, the sections are the page itself: they’re under **Sections**.',
          },
          { text: 'Click **Add Section**.', image: 'add-section-1' },
          {
            text: 'Choose the kind of section you want.',
            image: 'add-section-2',
            detail:
              '**Page heading** is a big headline with an optional photo. **Text** is paragraphs with bold, links and lists. **Photo with text** is a photo beside a heading and paragraph. **Photo gallery** shows photos two per row. **Starred list** is short lines with gold stars. **Call to action** is a centred heading with buttons. **Timeline** lists years with a paragraph each. **Quote** is a big quote on a cream band. **Embed** shows a Donorbox form, YouTube video or Facebook post. **Gold notice banner** is a full-width gold strip.',
          },
          {
            text: 'Fill it in. Watch the preview on the right; the new section is at the bottom of the page.',
            image: 'add-section-3',
          },
          {
            text: 'Most sections have a **Background** choice (Black or Charcoal). Alternate them so sections stand apart.',
          },
          { text: 'Add more sections the same way. Drag the dotted handle to reorder them.' },
          { text: 'Click **Publish changes**.' },
        ],
      },
      {
        heading: 'Adding a video or Donorbox form (Embed)',
        steps: [
          {
            text: 'For YouTube: on the video, click **Share**, then **Embed**, and copy only the address inside `src="…"`. It starts with `https://www.youtube.com/embed/`.',
          },
          { text: 'Paste it into **Embed address**, and fill in **Title** with a short description, such as “Sheriff Weisburn at the 2026 parade”.' },
        ],
      },
    ],
    troubleshooting: [
      {
        problem: 'The embed address is refused.',
        fix: 'Only Donorbox, YouTube and Facebook can be embedded, and the address must start with `https://`.',
      },
    ],
    related: ['new-page', 'change-photo'],
  },

  {
    slug: 'new-page',
    title: 'Create a brand-new page',
    summary: 'Build a new page from ready-made sections, publish it, and add it to the menu.',
    category: 'Pages',
    minutes: 10,
    parts: [
      {
        heading: 'Create the page',
        steps: [
          { text: 'Under **Pages**, click **Custom Pages**, then **Create New**.', image: 'new-page-1' },
          {
            text: 'Type the **Title**. It is shown in the browser tab and in Google results.',
            image: 'new-page-2',
          },
          {
            text: 'On the right, leave **Web address** empty. It is made from the title, for example “Meet the Team” → weisburnforsheriff.com/meet-the-team.',
            detail:
              'Some addresses belong to the existing pages (about, donate, events, time-in-office and a few others) and can’t be used. Once published, the address can’t be changed.',
          },
          { text: 'Optional: on the right, add a **Description** of one or two sentences for Google and for previews when the link is shared.' },
        ],
      },
      {
        heading: 'Build it from sections',
        steps: [
          {
            text: 'Under **Sections**, click **Add Section** and choose **Page heading**. Fill in the headline and a short intro.',
            image: 'new-page-3',
            detail: 'Every new page should start with a Page heading. It becomes the page’s main title.',
          },
          { text: 'Keep clicking **Add Section** to add text, photos, buttons and so on. See the guide on adding sections.' },
          { text: 'Check the preview on the right, then click **Publish changes**.' },
        ],
      },
      {
        heading: 'Add it to the menu (optional)',
        steps: [
          {
            text: 'New pages are not added to the menu by themselves. Go to **Site Settings → Header**, click **Add Menu link**, and type the page’s address, for example `/meet-the-team`. Click **Save**.',
          },
        ],
      },
    ],
    checkYourWork: ['Visit weisburnforsheriff.com/your-page-address and check it on a phone too.'],
    troubleshooting: [
      {
        problem: 'It says the web address is already used or reserved.',
        fix: 'Type a different web address on the right, for example add a word like “-2026”.',
      },
      {
        problem: 'I want to take the page down.',
        fix: 'Click **⋮** at the top right and choose **Unpublish**. It stays in the list so you can publish it again later.',
      },
    ],
    related: ['add-section', 'menu-header-footer'],
  },

  {
    slug: 'photos-and-files',
    title: 'Upload and manage photos and PDFs',
    summary: 'Upload photos and PDFs, write good descriptions, and tidy up files you no longer use.',
    category: 'Photos & files',
    minutes: 4,
    parts: [
      {
        heading: 'Upload',
        steps: [
          { text: 'Under **Events & Photos**, click **Photos & Files**. You see every photo and PDF on the site.', image: 'photos-and-files-1' },
          {
            text: 'Click **Create New**, drag in your photo or PDF (or click **Select a file**), fill in **Description (alt text)**, and click **Save**.',
            image: 'photos-and-files-2',
            detail:
              'You can also upload straight from any photo or file box on a page with its **Create New** button. Accepted: JPEG, PNG, WebP, HEIC photos and PDFs, up to 25 MB.',
          },
        ],
      },
      {
        heading: 'Write a good description',
        steps: [
          {
            text: 'Say what is in the photo, as if describing it on the phone: “Sheriff Weisburn talking with a reporter at the county fair”.',
            detail: 'For a PDF, say what the document is: “Printable golf outing flyer”. Don’t start with “Photo of…”.',
          },
        ],
      },
      {
        heading: 'Delete a file',
        steps: [
          {
            text: 'Open the file and click **⋮** → **Delete** at the top right.',
            detail:
              'A file still used on a page or event can’t be deleted. The message tells you where it is used: remove it there first (and publish), then delete it.',
          },
        ],
      },
    ],
    troubleshooting: [
      {
        problem: 'I replaced a photo but the old one still shows.',
        fix: 'Make sure you published the page after choosing the new photo. Then refresh the website after a few seconds.',
      },
    ],
    related: ['change-photo'],
  },

  {
    slug: 'undo-a-mistake',
    title: 'Undo a mistake',
    summary: 'Throw away unpublished changes, go back to an earlier version, or take something off the site quickly.',
    category: 'People & help',
    minutes: 4,
    parts: [
      {
        heading: 'Go back to an earlier version',
        intro: 'Every save is kept. You can look back and restore any of the last 20.',
        steps: [
          { text: 'Open the page, event or Site Settings and click **Versions** at the top.', image: 'undo-a-mistake-1' },
          {
            text: 'Click a version by its date to see what was different.',
            image: 'undo-a-mistake-2',
          },
          {
            text: 'Click **Restore this version**, then confirm.',
            detail: 'On pages and events, check the preview and click **Publish changes** to put the restored version live.',
          },
        ],
      },
      {
        heading: 'Take something off the site quickly',
        steps: [
          {
            text: 'Events and custom pages: click **⋮** at the top right and choose **Unpublish**. For an event you can also set its **Status** to **Hidden**.',
          },
          {
            text: 'The banner: go to **Site Settings**, untick **Show the announcement banner**, and click **Save**.',
          },
        ],
      },
    ],
    checkYourWork: ['Refresh the website after a few seconds and check the page is how you want it.'],
    related: ['getting-started', 'get-help'],
  },

  {
    slug: 'people',
    title: 'Add a person, reset a password, or remove someone',
    summary: 'Invite a new editor, send a password reset link, or remove someone’s access.',
    category: 'People & help',
    minutes: 4,
    adminsOnly: true,
    beforeYouStart: ['Only admins can do this. Editors can change everything else on the site.'],
    parts: [
      {
        heading: 'Invite someone',
        steps: [
          { text: 'Under **Settings**, click **Users**.' },
          {
            text: 'In **Invite a user** at the top, type their name and email, choose a role, and click **Invite user**.',
            image: 'people-1',
            detail: '**Editor** can change and publish all content. **Admin** can also add and remove people.',
          },
          {
            text: 'A setup link appears. Click **Copy link** and send it to them yourself, by text message or email.',
            detail:
              'The site doesn’t send emails. The link works once, for 72 hours. They open it, choose a password, and they’re in.',
          },
        ],
      },
      {
        heading: 'Reset a password or resend an invite',
        steps: [
          {
            text: 'Click **Users**, then the person’s name. On the right, click **Copy setup / reset link** and send it to them.',
            image: 'people-2',
            detail: 'Any earlier link stops working. This also helps if someone is locked out.',
          },
        ],
      },
      {
        heading: 'Unlock someone',
        steps: [
          {
            text: 'After 5 wrong passwords an account locks for 10 minutes. To unlock it now, open the person and click **Force Unlock**.',
          },
        ],
      },
      {
        heading: 'Remove someone',
        steps: [{ text: 'Open the person, click **⋮** at the top right, choose **Delete**, and confirm.' }],
      },
    ],
    related: ['get-help'],
  },

  {
    slug: 'get-help',
    title: 'Something isn’t working',
    summary: 'Quick answers to the most common problems.',
    category: 'People & help',
    minutes: 2,
    parts: [
      {
        steps: [
          {
            text: '**My change isn’t on the website.** Check that you clicked **Publish changes** (or **Save** in Site Settings). Wait 10 seconds and refresh the website. If you use a phone, close and reopen the page.',
          },
          {
            text: '**The Publish changes button is grey.** There is nothing new to publish yet. Make your change and wait a second.',
          },
          {
            text: '**A box has a red message.** Something is required or not allowed there. Read the message and fix that box.',
          },
          {
            text: '**I can’t delete a photo.** It is still used somewhere. The message says where: remove it there first.',
          },
          {
            text: '**I can’t change an event’s or page’s web address.** Addresses are locked after first publishing so shared links keep working. Ask an admin if it really must change.',
          },
          {
            text: '**I’m locked out.** Wait 10 minutes, or ask an admin to unlock you or send a new password link.',
          },
          {
            text: '**I broke something.** You can’t break the design, and nothing is lost: see **Undo a mistake** to go back to an earlier version.',
          },
          {
            text: '**Still stuck?** Contact James and say which page you were on and what you clicked.',
          },
        ],
      },
    ],
    related: ['undo-a-mistake', 'getting-started'],
  },
];

export const guideBySlug = (slug: string): Guide | undefined => GUIDES.find((guide) => guide.slug === slug);
