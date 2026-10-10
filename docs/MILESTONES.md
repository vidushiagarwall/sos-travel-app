# HerWay: 10-Milestone Plan (Research First, One Link)

Prepared for Vidushi by Tamanna · 10 Oct 2026

## Overview

HerWay helps a woman travelling solo feel prepared and safe. She opens the link, types "I'm travelling to Vietnam", and gets everything she needs for that country in one place: emergency numbers, safety advice, scams to watch for, and a way to keep her family in the loop.

The first milestones are research. You will find out what already exists, where trustworthy data lives, and what a solo traveller really needs. Then you build it, piece by piece, on the same link.

- **Builder:** Vidushi (StepAhead)
- **Mentor:** Tamanna
- **The one link:** vidushiagarwall.github.io/sos-travel-app
- **Goal:** anyone can open the link, pick a country, get a trustworthy safety guide for it, and share their trip with someone they trust.
- **Pace:** about 3 days per milestone, roughly 5 weeks in total. Quality matters more than speed.

**Current milestone:** 1

## The rules (read these first)

- **One milestone at a time.** Do not start the next milestone until Tamanna approves the current one. Approval is written in the Approval log at the end of this document, with the date.
- **Every milestone ends on the link.** Research is not done until it shows up on the website. No new links, same URL every time.
- **To ask for approval**, send Tamanna: the link, what to look at, and your research doc link. She runs the Test. If it passes, she approves. If not, she tells you what to fix.
- **Every fact needs a source.** Safety information that is wrong can hurt someone. Every number, rating or tip on the site shows where it came from and when you last checked it.
- **Keep this plan inside your code project.** This file lives at docs/MILESTONES.md. Research notes go in docs/research/. Tick off each item as you finish it (change `- [ ]` to `- [x]`). The AI reads this file at the start of every session.

---

## Phase 1: Research (Milestones 1 to 4)

### Milestone 1: Your wishlist and your research plan

Before building anything, write down what you want HerWay to be.

**Deliverables**

- [ ] A Word document listing everything you want on the website, shared with Tamanna as a link for review
- [ ] For each item: what it is, who it helps, and why it matters
- [ ] Mark each item as Must have, Nice to have or Later
- [ ] Your research questions written down (answered in Milestones 2 to 4):
    - What competitor apps already do this?
    - Is there a public database of unsafe places to travel?
    - Is there a database of helpline numbers for every country?
    - If I am travelling to Vietnam solo, what can this tool help me with?
- [ ] A "What's coming" section on the link showing your Must have list

**Test**

- [ ] Tamanna reads the Word doc and leaves comments. You answer every comment.
- [ ] Tamanna opens the link and sees the "What's coming" section, matching the Must have list.

### Milestone 2: Competitor research

Find out what already exists, so HerWay does something better or different.

**Deliverables**

- [ ] At least 8 apps or websites studied: women's safety apps, travel safety apps and emergency apps. Starting points: bSafe, Life360, Noonlight, GeoSure, Safetipin, TripWhistle, 112 India, Himmat Plus.
- [ ] For each one: what it does, who it is for, which countries it covers, free or paid, what it does well, what is missing
- [ ] A comparison table in docs/research/competitors.md
- [ ] Your answer in 3 lines: what will HerWay do that none of them do well?
- [ ] A "How HerWay is different" section on the link

**Test**

- [ ] Tamanna reads the table and asks "why would someone use HerWay instead of X?" for two apps. You can answer both.
- [ ] The "How HerWay is different" section is on the link and makes sense to someone new.

### Milestone 3: Where trustworthy data lives

Find real, public data the website can use, and judge whether it can be trusted.

**Deliverables**

- [ ] Unsafe places and travel advisories: official sources that rate how safe each country is. Starting points: US State Department travel advisories, UK government (FCDO) travel advice, Australia's Smartraveller, Canada's travel advice. Also crowd-sourced sources such as Numbeo and Safetipin, noting how they differ from official ones.
- [ ] Emergency and helpline numbers for every country: at least 2 sources, compared for 10 countries. Do they agree? Where they disagree, which one is right?
- [ ] Women-specific helplines: for your 5 test countries, women's helplines or tourist police numbers, if they exist
- [ ] For every source: who publishes it, how often it is updated, whether it is free to use, and whether it can be read by code (an API or downloadable file)
- [ ] Notes saved in docs/research/data-sources.md
- [ ] A "Sources" page on the link listing the sources HerWay will use, and why

**Test**

- [ ] Tamanna picks 3 random countries. For each one, you show the emergency numbers and the source they came from.
- [ ] The "Sources" page is live on the link.

### Milestone 4: The Vietnam test case

Imagine you are travelling to Vietnam solo. What would you need before you go, when you land, and if something goes wrong?

**Deliverables**

- [ ] Research Vietnam as a solo woman traveller and answer:
    - [ ] Emergency numbers (police, ambulance, fire) and a tourist helpline if there is one
    - [ ] The official travel advisory level, and what it says
    - [ ] Common scams and risky situations for tourists
    - [ ] Safer ways to get around (taxis, ride apps, night travel)
    - [ ] Areas or times to be careful
    - [ ] The nearest Indian embassy or consulate, with address and phone
    - [ ] 5 useful phrases in Vietnamese (help, police, hospital, I am lost, call this number)
    - [ ] Practical things: local SIM card, which apps work there, what to save offline
- [ ] Every fact has a source and a "last checked" date
- [ ] A Vietnam page on the link, built by hand, organised into Before you go, When you arrive and If something goes wrong

**Test**

- [ ] Tamanna reads the Vietnam page as if she is flying there next week. She can find the police number, the embassy and 3 scams within 1 minute.
- [ ] She spot-checks 3 facts against the sources. All 3 match.

---

## Phase 2: Build the travel guide (Milestones 5 and 6)

### Milestone 5: "Where are you travelling?"

Turn the Vietnam page into a template that works for any country.

**Deliverables**

- [ ] A search box on the home page: "Where are you travelling?"
- [ ] Type a country, and its guide page opens, with the same layout as the Vietnam page
- [ ] Guides for 5 countries, with full research: Vietnam plus 4 of your choice (for example Thailand, Japan, UAE, France)
- [ ] Each guide shows its sources and its "last checked" date
- [ ] A country without a guide yet shows a friendly message, never a blank page

**Test**

- [ ] Tamanna types each of the 5 countries and gets a full guide.
- [ ] She types a country that is not ready and gets the friendly message.

### Milestone 6: Emergency numbers for every country

The full guides cover 5 countries, but emergency numbers should work everywhere.

**Deliverables**

- [ ] Emergency numbers for every country, from the source you trusted most in Milestone 3
- [ ] Tapping a number opens the phone dialler
- [ ] The numbers still show with no internet
- [ ] A clear line at the top: "In danger? Call the local emergency number first."
- [ ] The existing SOS button works: it builds a message with your location, and "Copy message" works

**Test**

- [ ] Tamanna picks 5 random countries and checks the numbers against your sources.
- [ ] She turns on airplane mode and the numbers still show. Tapping one opens the dialler (she does not call).

---

## Phase 3: Safety features (Milestones 7 to 9)

### Milestone 7: Real login

Today any email gets you into the app. Now sign-in becomes real.

**Deliverables**

- [ ] Sign up and log in with email, using Supabase (free)
- [ ] Wrong password shows a clear message
- [ ] Stays logged in after refreshing the page, and log out works
- [ ] The "Secure sign-in is coming soon" note is removed
- [ ] The country guides still work without logging in

**Test**

- [ ] Tamanna creates an account, logs out, logs back in, refreshes, and is still in. A wrong password does not get her in.

### Milestone 8: Trusted contacts and a shared trip plan

**Deliverables**

- [ ] Add, edit and remove trusted contacts, saved to your account
- [ ] "My trip": choose a country, dates and where you are staying
- [ ] Share the trip plan with your trusted contacts by email or WhatsApp, including that country's emergency numbers

**Test**

- [ ] Tamanna adds a contact on her phone, then logs in on her laptop and the contact is there.
- [ ] She creates a trip to Vietnam and shares it. The message arrives with the trip details and Vietnam's emergency numbers.

### Milestone 9: Safe Arrival

If you do not check in by a set time, HerWay alerts your trusted contacts automatically.

**Deliverables**

- [ ] Start a journey with an arrival time, and a big "I'm safe" button
- [ ] If the time runs out, an email alert goes to trusted contacts with your last location as a map link
- [ ] The alert is sent by the server, so it still goes out when the app is closed
- [ ] A "Try it in 2 minutes" test mode

**Test**

- [ ] Tamanna starts a 2-minute journey, closes the app and waits. Her email gets the alert with a working map link.
- [ ] She starts another and taps "I'm safe" in time. No alert is sent.

---

## Phase 4: Finish (Milestone 10)

### Milestone 10: Test it yourself, fix it, launch v1.0

**Deliverables**

- [ ] Use HerWay on your own trips for one week, with one family member as your trusted contact. Keep a trip log.
- [ ] Fix the top 3 problems you found
- [ ] Works on Android Chrome and iPhone Safari
- [ ] An "Our Story" page: the problem, your research, how you built it, the results
- [ ] A 2-minute demo video, linked from the home page
- [ ] A GitHub release tagged v1.0

**Test**

- [ ] Tamanna sends the link to someone who has never heard of HerWay. They search for a country, read its guide and run a Safe Arrival test on their own, with no help.

---

## Working rules

- One milestone at a time, and only after the last one is approved.
- Test on your phone after every change.
- Save to GitHub every day, so a bad AI change can always be undone.
- Understand what the AI built. If you cannot explain it, ask the AI to explain it simply.
- Check AI research. AI tools can invent facts. Every fact from an AI must be checked against a real source before it goes on the site.

**Daily update (5 minutes, on WhatsApp):** a 30-second screen recording or screenshot of the link, plus "Done today:" and "Next tomorrow:". If nothing shipped, say so and why.

## Scope notes

- Not in this plan: a Play Store or App Store app, AI chatbots, SMS alerts (email first), social features.
- Trust is the product. A guide with 5 well-researched countries beats one with 200 unchecked ones.
- HerWay does not replace emergency services. The site should say so clearly.

## Approval log

| Milestone | Sent for review | Approved by Tamanna | Notes |
| --- | --- | --- | --- |
| 1. Wishlist and research plan | | | |
| 2. Competitor research | | | |
| 3. Where trustworthy data lives | | | |
| 4. The Vietnam test case | | | |
| 5. "Where are you travelling?" | | | |
| 6. Emergency numbers for every country | | | |
| 7. Real login | | | |
| 8. Trusted contacts and trip plan | | | |
| 9. Safe Arrival | | | |
| 10. Test, fix, launch v1.0 | | | |

*Guiding principle: research it, build it, put it on the link, get it approved, then move to the next piece.*
