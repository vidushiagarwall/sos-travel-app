# Vietnam emergency numbers: sources

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
