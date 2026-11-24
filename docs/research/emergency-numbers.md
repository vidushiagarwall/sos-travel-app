# Emergency numbers: sources

## Vietnam

Last checked: 24 November 2026. The data lives in `src/data/countryEmergency.ts`.

## On the site (confirmed on official pages)

| Number | What | Official source |
| --- | --- | --- |
| 113 | Police | [UK FCDO: Vietnam, Getting help](https://www.gov.uk/foreign-travel-advice/vietnam/getting-help) |
| 115 | Ambulance | same page |
| 114 | Fire | same page |
| +84 913 089 165 | Indian Embassy emergency line (also WhatsApp) | [Embassy of India Hanoi: Emergency contact number](https://www.indembassyhanoi.gov.in/page/emergency-contact-number) |
| +84 24 3824 4989 / 4990 | Indian Embassy office (chancery), 58-60 Tran Hung Dao Street, Cua Nam Ward, Hanoi | [Embassy of India Hanoi: Contact Us](https://www.indembassyhanoi.gov.in/page/contact-us/) |

The same 113 / 114 / 115 numbers also appear on the [US State Department Vietnam page](https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Vietnam.html).

The UK page also says: "Emergency numbers in Vietnam are operated in Vietnamese only." This is shown as a tip on the site.

The UK page also lists 112 (national search and rescue) and 111 (child protection). These aren't on the site yet, because they're not what a traveller needs first.

## Not on the site yet: tourist helpline (couldn't confirm)

I couldn't find a current official tourist helpline for Hanoi. These are the leads I found, all old:

- 0941 33 66 77: Hanoi tourism hotline ([Hanoi Times, 2016](https://hanoitimes.vn/hanoi-restores-the-hotline-to-support-tourists-13356.html), [VietnamPlus](https://en.vietnamplus.vn/hanoi-hotlines-help-protect-foreign-tourists/45120.vnp))
- 1800 556 896: Hanoi tourism switchboard ([QDND, 2018](https://en.qdnd.vn/travel/news/hanoi-launches-telephone-switchboard-to-improve-tourism-services-498272))
- 1022 ext. 8: Ho Chi Minh City only, so not useful for Hanoi ([Tuoi Tre, 2023](https://tuoitrenews.vn/news/lifestyle/20231229/hotline-1022-extension-8-a-perfect-tool-for-tourists-wanting-to-explore-ho-chi-minh-city/77566.html))

To do: check the Hanoi Department of Culture, Sports and Tourism website, or ask the Indian Embassy. If you confirm a number, add it to `countryEmergency.ts` with `kind: 'helpline'` and remove the "not yet confirmed" note.

---

# India emergency numbers: sources

Last checked: 24 November 2026. India is now the first country on the page, so the page opens on it.

| Number | What | Source |
| --- | --- | --- |
| 112 | All emergencies (police, fire, ambulance) | [PIB: Pan-India Emergency Number 112 launched](https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=188727&reg=3&lang=2), [MHA: ERSS](https://www.mha.gov.in/en/commoncontent/emergency-response-support-system-erss) |
| 181 | Women Helpline, 24 hours, toll free | [Govt of Haryana WCD: Women Helpline 181](https://wcdhry.gov.in/women-helpline-number-181/) |
| 1363 / 1800 11 1363 | Ministry of Tourism helpline, 24x7, 12 languages | [Embassy of India, Sweden](https://www.indembassysweden.gov.in/page/tourist-help-line-in-india/), [Ministry of Tourism PDF (Feb 2026)](https://tourism.gov.in/sites/default/files/2026-02/Ministry%20of%20Tourism%20has%20set%20up%20a%2024x7%20Multi-Lingual%20Tourist%20Helpline.pdf) |

**Please check these yourself:** the PIB, MHA and Ministry of Tourism pages blocked automatic reading, so these were confirmed from search summaries of those pages, not by opening them. The Haryana 181 page and the Embassy in Sweden tourist helpline page were read in full.

MHA says 100 (police), 101 (fire), 108 (ambulance) and 181 are being merged into 112. Because whether the old numbers still work depends on the state, they aren't shown as buttons, only mentioned in a tip.

---

# "If you cannot reach her" page (family in India): sources

Last checked: 24 November 2026. Data lives in `src/data/familyPlan.ts`.

| Number | What | Source |
| --- | --- | --- |
| +84 913 089 165 | Indian Embassy Hanoi emergency line (also WhatsApp) | [Embassy of India Hanoi](https://www.indembassyhanoi.gov.in/page/emergency-contact-number) |
| +84 24 3824 4989 | Indian Embassy Hanoi office | [Embassy of India Hanoi: Contact Us](https://www.indembassyhanoi.gov.in/page/contact-us/) |
| 1800 11 8797 | MEA control room, toll free in India | [MEA advisory, March 2026](https://www.mea.gov.in/Images/CPV/4408-02-english-2026.pdf) |
| +91 11 2301 1954 | MEA control room, South Block | [MEA: Contact](https://www.mea.gov.in/contact-tele-inquiry) |
| madad.gov.in | MEA online help portal | (official site) |

**Please check:** the MEA numbers were confirmed from search summaries of those pages, because mea.gov.in blocked automatic reading. The embassy pages were read in full. The embassy site also lists 1800118797 and three other MEA numbers, but under an old COVID-19 heading.

**Tourist police in Hanoi:** no official number found. Vietnam police is 113 ([UK FCDO](https://www.gov.uk/foreign-travel-advice/vietnam/getting-help)), which only works from a phone in Vietnam, so the page asks family to go through the hotel or embassy.

**Wait times** (right away, 2 hours, 6 hours, 12 hours) are HerWay's own suggestion, not official advice. The page says so.
