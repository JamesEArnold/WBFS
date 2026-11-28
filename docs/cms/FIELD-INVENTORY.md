# Field inventory

Where every piece of previously hardcoded content now lives in the CMS. Content was copied **verbatim** by the insert-only seed (`scripts/lib/seed-content.ts`). Parity is proven by the Phase 0 text and visual baselines, which have not been changed.

**Conventions**
- *Overline*: the small gold line. Where the original showed `★ … ★`, the stars are added by the page; only the words are stored.
- *Heading + accent*: two-tone headlines. `heading` is the white line and `headingAccent` is the gold second line.
- `**double stars**` in a text field marks words that the page highlights. This covers the cream payee name on Donate, the gold "YOUR" badge on About, the upright "now." in the Home quote, and the bold "YOU" on Home.
- Buttons: label, link (path, URL, `mailto:`, `#section`) **or** an uploaded file, a style (solid gold or gold outline), and a new-tab option.

**Design chrome (intentionally not editable):** the sheriff star badge (`/SheriffStar.PNG`), the logo, the Facebook/Instagram icons, colours, layout, and the "★ {Month Year} ★" line on /events, which is generated from the date. The email and volunteer sign-up forms (fields, validation, SendGrid) are form logic, not content.

---

## Site Settings (`siteSettings`, saves go live immediately, no drafts)
| Where | Field |
|---|---|
| Announcement strip (all pages) | `banner.enabled`, `banner.text`, `banner.linkLabel`, `banner.linkUrl` |
| Thin tagline above the header | `tagline` |
| Header navigation | `nav[] { label, href }` (manual list; new pages are not added automatically) |
| Header / mobile-menu button | `headerCta`, `mobileCta` |
| Footer | `footerBlurb`, `hqHeading`, `addressLine1`, `addressLine2`, `contactEmail`, `actionHeading`, `footerCta` |
| Social links (footer **and** the Home "Stay Updated" icons) | `facebookUrl`, `instagramUrl` |
| "Paid for by…" | `disclaimer` |

## Home `/` (`home`)
| Section | Fields |
|---|---|
| Top | `overline`, `heading`, `headingAccent`, `intro`, `heroButtons[]` |
| Portrait | `portraitImage`, `portraitCaption`, `portraitOverline`, `portraitHeading`, `portraitBody`, `portraitLinkLabel`, `portraitLinkUrl` |
| Featured event strip | `eventsOverline`, `eventsHeading`, `featuredEvent` (an Event; shows its card overline, title and subtitle, and links to its page), `featuredEventCtaLabel`. Hidden when no event is chosen or the event isn't published. |
| Ways to help | `pillarsOverline`, `pillars[] { title, body, ctaLabel, ctaUrl }` (max 3) |
| Quote | `quote` (italic; `**…**` upright), `quoteAttribution` |
| Gallery | `galleryOverline`, `galleryHeading`, `gallery[] { image, caption, focus }`. The photo's alt text is its Media description. |
| Volunteer | `volunteerOverline`, `volunteerHeading`, `volunteerBody`, `volunteerTasks[]`, `volunteerFormOverline`, `volunteerFormHeading` |
| Email updates | `updatesOverline`, `updatesHeading`, `updatesBody` |

## About `/about` (`about`)
| Section | Fields |
|---|---|
| Top | `overline`, `heading`, `headingAccent`, `intro`, `heroImage`, `heroImageCaption` |
| Origins | `originsOverline`, `originsBody` |
| Service record | `timelineOverline`, `timelineHeading`, `timeline[] { year, text }` |
| Sign-off | `signOffGreeting`, `signature` (image), `signOffName`, `signOffButtons[]`, `signOffImage`, `signOffImageCaption` |

## Donate `/donate` (`donate`)
| Section | Fields |
|---|---|
| Top | `overline`, `heading`, `headingAccent`, `intro` |
| Donation form | `donorboxUrl` (must be `https://donorbox.org/…`) |
| Mail-in | `mailOverline`, `mailHeading`, `mailBody`, `mailToLabel`, `mailToName`, `mailToLine1`, `mailToLine2`, `mailNote`, `stats[] { value, label }` (max 3) |
| Legal small print | `disclaimer` |

## In Office `/time-in-office` (`inOffice`)
| Section | Fields |
|---|---|
| Top | `overline`, `heading`, `headingAccent`, `intro` |
| Year by year | `timelineOverline`, `timelineHeading`, `outreachHeading`, `years[] { year, events[], outreach[] }` |
| Closing call to action | `ctaOverline`, `ctaHeading`, `ctaBody`, `ctaButtons[]` |

## Events Page `/events` (`eventsPage`)
| Section | Fields |
|---|---|
| Top | `overline`, `heading`, `headingAccent`, `intro` |
| List | `listHeading` (the month line above it is automatic) |
| No events | `emptyState { overline, heading, body, buttons[] }` |

## Events `/events/<slug>` (`events` collection)
| Where | Fields |
|---|---|
| Listing card (/events, and the Home featured strip) | `title`, `overline`, `subtitle`, `facts[]`, `listingCtaLabel` |
| Event page | `soldOutBanner { heading, body }` (shown when `status` = Sold out), `dateLabel`, `heading`, `headingAccent`, `heroBlurb`, `buttons[]`, `flyerPdf`, `flyerImages[] { image, linkLabel }`, `flyerCaption` |
| Behaviour | `status` (upcoming / sold out / past / hidden), `date` (list order), `expiresAt` ("Remove from listings after": off the Events list and Home strip after that day, Eastern time; page stays up), `slug` (locked after first publish) |
| Filled in when blank (`lib/cms/eventText.ts`) | `heading` → the event name; `dateLabel` → "Friday · September 18, 2026"; `subtitle` → "Friday, September 18, 2026" |

**Form layout.** Each page form is split into tabs matching the sections above (names in `cms/tabs.ts`), ending with **Add more sections** (`extraSections`). Rarely changed fields, mostly the small gold lines, sit under **More options** at the bottom of their tab. Events use the tabs **Basics** (date-and-place line, paragraph, buttons; More options holds the listing gold line, starred lines, link text, date line and headline), **Flyer**, **Sold out** and **Add more sections**. Tabs and More options are layout only: the stored fields above are unchanged.
