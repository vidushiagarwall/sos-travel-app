# Phone checklist

Do this on your phone at https://vidushiagarwall.github.io/sos-travel-app. Tick each box as you go.

## 1. Add 2 contacts
- [ ] Open **Contacts**. Type a number with no `+91` (like `98765 43210`). A red "Add +91" warning shows and **Add contact** is greyed out.
- [ ] Add **Contact A** with `+91` and your own number (so you can see the message arrive).
- [ ] Add **Contact B** with `+91` and a friend's number (tell them first!).
- [ ] Tap **Edit** on Contact B, change the name, tap **Save changes**. The list updates straight away.
- [ ] Refresh the page. Both contacts are still there.

## 2. Trigger SOS
- [ ] Open **SOS**. It says "Your SOS will go to **2 people**: A, B".
- [ ] Allow location when asked. Tap the SOS button.
- [ ] The message shows with a Google Maps link. Tap the link: it opens your real location.
- [ ] The list says "Send to 2 of 2 people" with both ticked.

## 3. Send to only 1 of them
- [ ] Untick Contact B. It says "Send to 1 of 2 people" and B's buttons disappear.
- [ ] Tap **WhatsApp** next to Contact A. WhatsApp opens on A's chat with the message filled in. Send it.
- [ ] Go back, tap **SMS everyone ticked (1)**. Your SMS app opens with only A in "To".

## 4. Send to both
- [ ] Tick Contact B again. It says "Send to 2 of 2 people".
- [ ] Tap **WhatsApp** next to A, send. Come back, tap **WhatsApp** next to B, send.
- [ ] Tap **SMS everyone ticked (2)**. Both numbers are in "To".
- [ ] Ask B: did the message arrive, and does the map link work?

## 5. Share a trip
Trips are switched off right now (`trips: false` in `src/features.ts`), so there's no Trips tab.
- [ ] Instead, on **Contacts**, make an "If you cannot reach her" family link and send it to Contact A. Open it: the family page loads.
- [ ] Later, when trips are switched on: plan a trip, tap share, and check the same tick list shows up.

## 6. Log in with a wrong email
- [ ] Go Home, tap **Log in**. Type `priya@gmail` and a password. You see "That email doesn't look quite right".
- [ ] Type a proper email and a 5-character password. You see "needs at least 8 characters. You have 5 so far."
- [ ] Type a proper email and an 8+ character password. It lets you in.
- [ ] The note says "Accounts are coming soon. Your contacts stay on this phone for now."

## 7. Clean up
- [ ] Delete Contact B (it asks you to confirm first).

---

## Automatic tests

`npm test` checks the contacts store and the share links. It also runs on every push, before the site deploys, so a broken test stops a broken deploy.
