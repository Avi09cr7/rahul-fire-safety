# Contact journey and readability — 20 September 2026

This revision replaces the email-app fallback described in earlier sections.

- Diagnosed the apparently inactive form: its Web3Forms key was a placeholder, so submission opened a mailto URL without visible feedback. Removed that unconfigured branch.
- The form now says “Continue on WhatsApp” and opens the existing business WhatsApp number with a prepared enquiry. The visitor reviews and sends the message in WhatsApp. The website never claims that an enquiry has already been sent.
- Added a visible recovery panel with an explicit WhatsApp link and a copy option. If clipboard access is unavailable, it exposes selectable enquiry text.
- Kept drafts in sessionStorage for the current tab so navigating back or refreshing does not erase typed details. Storage failure does not block form use. No server-side draft storage was added.
- Enquiry calls to action now link directly to the form. Expertise cards preselect the relevant requirement, including when the same service is selected again after changing the form.
- Added prominent phone buttons and phone icons in the top bar, contact section, footer and mobile action bar. Email links have envelope icons; the address has a directions link; WhatsApp has its own labelled action.
- Removed visible model rotation instructions, the small equipment stamp and redundant tiny hero text. Keyboard instructions remain in the model’s accessible label.
- Increased small text to at least 14 px and body/form text to 16 px. Simplified mobile service cards to one column and made mobile controls fit the narrower layout.

Verification: production build and whitespace checks pass. Checked 320, 375, 390, 768, 1024, 1440 and 1920 px with no horizontal overflow. Reviewed desktop and phone layouts, confirmed all telephone links use tel: destinations and contain phone icons, verified no visible leaf text below 14 px in the phone DOM, and checked the smallest equipment-selector width fits its container. Tested required-field validation, service preselection, refreshing a draft and returning from WhatsApp. The real WhatsApp handoff page showed the correct business number and every fictional test field. No message was sent, phone call placed or email application launched. Physical phone touch hardware and other browser engines were not tested. Existing upstream 3D dependency warnings remain as documented below.

Local preview: http://127.0.0.1:4173/

---

# Orange branding and direct equipment interaction — 20 September 2026

This revision supersedes the client filters and rotation buttons described in the earlier audit below.

- Matched the interface accents to the orange direction of Rahul's logo: #f58220 buttons and graphics, dark labels, deeper orange text and lighter orange on charcoal sections. Physical equipment keeps its original appearance.
- Button label contrast is 6.05:1. Small orange text uses #b45007 (4.68:1 against the page background); large orange headings use #cc6109 (3.62:1).
- Removed the two rotation buttons. Visitors drag the model to rotate and tilt it, then release to return smoothly to its default pose. Pointer capture handles releases outside the target; pointer cancellation, lost capture, window blur and keyboard focus loss reset it as well.
- The model remains keyboard accessible with arrow keys and resets on key release. Reduced-motion preference makes the return immediate. Frames stop once the model reaches its starting position.
- Direct-touch handling is limited to the model's interaction surface; the surrounding page retains normal scrolling. Actual touch hardware and other browser engines were not available for testing.
- Removed all client categories and filtering logic. All 35 logos appear together.
- Clarified full equipment coverage, added portable equipment and safety accessories to the systems list, and made the complete-range link open the supply details.

Validation: production build passed; tested layouts at 320, 390, 768, 1024 and 1440 px without horizontal overflow. Desktop and phone-size drag tests recorded changing scene angles followed by an exact return to zero, including release outside the model and keyboard input. Temporary diagnostic logging was removed. Verified 35 logos, no client filters or rotation buttons, complete-range expansion, no broken loaded images and no production runtime errors. The upstream Three.Clock deprecation and lazy 3D chunk-size warnings remain as documented below. No deployment or Git push performed.

Preview: http://127.0.0.1:4173/

---

# Rahul Fire Safety — revised design, 20 September 2026

## Current design

- Replaced the text-led industrial hero with selectable 3D extinguishers, hose reels and hydrants. The extinguisher uses the existing attributed model; the hose reel and hydrant are original procedural geometry.
- Added a fire-hose page-progress indicator: vertical on desktop and horizontal below the phone header. It follows the actual document height, including filtering and expanded content, without replacing native scrolling.
- Added a consistent fire-red, charcoal and warm-white palette, substantial icons, equipment illustrations, a hose-inspired experience seal and shorter service copy.
- Replaced the client name directory with all 35 client logos, grouped by optional filters. Fourteen use vector artwork. Remaining legacy raster artwork is displayed at restrained sizes; this is not a claim that all 35 originals have been replaced with new high-resolution files.
- Corrected three existing asset mismatches: IIT Roorkee previously showed Hindon Filters; Uttam Energy and SNJ Bio Products were assigned each other's files. The new mapping and IIT vector now match their labels.
- Channel partner artwork now shows the verified Ceasefire and Mitras logos. Newtech and Rapidex are omitted until correct, unambiguous artwork is available; no unrelated logo is substituted.
- Reordered the phone hero so equipment appears in the first screen. Preserved the mobile call/survey actions, contact details and original project references.
- Photography remains explicitly representative sector photography; it is not presented as evidence of Rahul Fire Safety's completed installations.

## Additional asset sources

These are brand artwork files, not recreated text or invented marks. Existing trademark ownership is unchanged.

| Asset                 | Source                                                                                                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SBI                   | https://upload.wikimedia.org/wikipedia/commons/3/33/State_Bank_of_India.svg                                                                                                                                                                                                                 |
| Haldiram's            | https://upload.wikimedia.org/wikipedia/en/9/91/Haldiram%27s_2024_Logo.svg                                                                                                                                                                                                                   |
| Bharat Petroleum      | https://upload.wikimedia.org/wikipedia/commons/7/7c/Bharat_Petroleum_logo.svg                                                                                                                                                                                                               |
| POWERGRID             | https://upload.wikimedia.org/wikipedia/en/4/4f/Power_Grid_Corporation_of_India_Logo.svg                                                                                                                                                                                                     |
| Axis Bank             | https://upload.wikimedia.org/wikipedia/commons/c/ce/AXISBank_Logo.svg                                                                                                                                                                                                                       |
| IIT Roorkee           | https://upload.wikimedia.org/wikipedia/en/2/2d/Indian_Institute_of_Technology_Roorkee_Logo.svg                                                                                                                                                                                              |
| IFFCO                 | https://upload.wikimedia.org/wikipedia/en/0/05/Indian_Farmers_Fertiliser_Cooperative_Logo.svg                                                                                                                                                                                               |
| Domino's              | https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg                                                                                                                                                                                                                  |
| Extinguisher 3D model | RED2000, https://sketchfab.com/3d-models/realistic-fire-extinguisher-8b52b1f4c4c44bb9866146f60dbe534c — CC BY 4.0, https://creativecommons.org/licenses/by/4.0/. Model already present in the repository; scaled, positioned and lit for the new scene. Attribution included in the footer. |

## Verification of this revision

- Production build passed. Main JavaScript: 71.73 kB gzip; CSS: 9.76 kB gzip. The separately loaded 3D module is 247.76 kB gzip. The model is approximately 367 kB.
- 3D rendering uses one canvas, a capped pixel ratio and on-demand frames. It does not continuously animate or intercept touch scrolling.
- Checked layouts at 320, 375, 390, 768, 1024, 1440 and 1920 px with no horizontal overflow. Visually reviewed phone, tablet and desktop layouts in the in-app browser; physical devices and other browser engines were not tested.
- Verified all three equipment selections and rotation controls.
- Deliberately made the model unavailable in the development version: the fallback illustration appeared, rotation buttons were removed and equipment selection still worked. Restored the correct model reference afterwards. This intentional failure produced expected development errors; it is not present in the delivered build.
- Verified the 35-logo wall, no broken loaded images, and filter counts of 19 industry/infrastructure, 10 business/finance and 6 education.
- Verified mobile menu opening, first-link focus, scroll locking, Escape dismissal/focus return and closure after navigation.
- Verified sector selection, keyboard ArrowRight and Home navigation, and expandable system details.
- Verified required enquiry fields, rejection of an invalid phone number and native acceptance of valid test fields. No enquiry sent or email application launched.
- Verified hose progress at 0 at page start and 1 at page end.
- Production console: no runtime errors observed. An upstream React Three Fiber use of deprecated Three.Clock produces a warning; it does not prevent rendering. Build also reports the size of the lazily loaded Three.js chunk.
- Formatting and git whitespace checks passed. No commit, push or live deployment performed.

Local production preview: http://127.0.0.1:4173/

---

# Rahul Fire Safety — local redesign, 19 September 2026

## Design and content decisions

- Replaced the mixed light/dark themes, orange glows and rounded card styling with one charcoal, warm-white and vermilion system.
- Added locally hosted Barlow Condensed Bold headings and Manrope body type. Font licences are in `public/fonts`.
- Replaced automated logo/project marquees with static logo grids and keyboard-accessible sector tabs.
- Featured six vector client logos; retained the full list of 35 organisations in the client directory.
- Separated certification/registration text from channel partners. Removed the incorrect Rapidex Worldwide Express image; Rapidex and Newtech remain text entries from the original company profile until correct artwork is confirmed.
- Preserved contact details, service coverage and project references from the existing site. No new client relationships, project metrics or revenue claims were added.
- Removed the previous misleading photo-to-project pairings. The new industrial photograph is representative stock, labelled on the page. Genuine photographs of completed installations can replace these sector images when supplied.
- Made the existing email-draft enquiry flow explicit. Direct form delivery still requires configuring the existing Web3Forms integration.

## Asset provenance

| Asset                                          | Source                                                                                                                  | Notes                                                                                                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Industrial-scale image and responsive variants | https://unsplash.com/photos/1f3kODRtpxQ                                                                                 | Anthony Maw; free under the Unsplash licence; representative Canadian refinery, not a Rahul Fire Safety installation. Local 960, 1600 and 2400 px variants. |
| Tata vector                                    | https://www.tata.com/etc.clientlibs/tata/clientlibs/assets/resources/img/pages/nav/Tata_Logo2.svg                       | Official artwork; white fill adapted to Tata blue for the light background; geometry unchanged.                                                             |
| HDFC Bank vector                               | https://s7ap1.scene7.com/is/content/hdfcbankPWS/hdfc-bank-logo?fmt=webp                                                 | Original SVG linked from https://www.hdfcbank.com/.                                                                                                         |
| Ceasefire                                      | https://static.wixstatic.com/media/cf66d3_2478e874b7ed462f8ad61010d66e2a0b~mv2.png                                      | Original 1526 × 1527 artwork linked from https://www.ceasefire.in/.                                                                                         |
| Mitras                                         | https://mitrastechno.com/wp-content/uploads/2021/04/mitras-wh.png                                                       | Original 1600 × 376 artwork linked from https://mitrastechno.com/.                                                                                          |
| IndianOil, HP, BHEL, ICICI                     | Existing `public/assets/trust/*.svg`                                                                                    | Reused vector originals instead of the previous low-quality raster versions.                                                                                |
| Rahul Fire Safety logo                         | Existing `public/assets/rahul-logo.png`                                                                                 | Original 1588 × 352 artwork.                                                                                                                                |
| Shipra Mall                                    | Existing project image                                                                                                  | Original attribution retained: Андрей Коваль, CC BY 3.0, via Wikimedia Commons. Shown as a facility reference, not installation evidence.                   |
| Manufacturing interior                         | Existing `public/assets/plant-installation.jpg`                                                                         | Labelled illustrative; project/location attribution not asserted.                                                                                           |
| Barlow Condensed / Manrope                     | https://github.com/google/fonts/tree/main/ofl/barlowcondensed and https://github.com/google/fonts/tree/main/ofl/manrope | SIL Open Font Licence; self-hosted.                                                                                                                         |

## Verification

- Production build passes; approximately 68.9 kB gzip JavaScript and 5.7 kB gzip CSS.
- Browser layout checks at 320, 375, 390, 768, 1024, 1440 and 1920 px: no horizontal overflow.
- Desktop and phone visual review: hero, logos, project navigation, contact section and form.
- Mobile menu opens, focuses its first link, locks background scrolling and closes after navigation.
- Sector selection and keyboard ArrowRight / Home behavior checked.
- Native expandable systems and the full client directory checked.
- Required fields and phone format validation checked; a syntactically valid set of enquiry fields passes native validation.
- Production preview console inspected: no errors or warnings observed.
- No enquiry was sent and no email app was launched during testing.
- No commit, push or live deployment performed.

Local production preview: http://127.0.0.1:4173/
