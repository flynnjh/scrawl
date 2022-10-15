TODO:

Sidebar:

- [ ] Improve responsiveness

  - Should be small bar on half Macbook screen size

- [ ] Improve color scheme

  - Black should be a ligher grey

Home/Thought Creation:

- [x] Move index to /home 
- [ ] Redesign it because it's shit (wip).

About:

- [ ] Add proper about/not signed in page

~~Onboarding:~~

- [ ] ~~Implement proper username taken error~~
- [ ] ~~Make it look like I didn't throw it together in a sociology lesson~~

Signup:

- [ ] Make signup page:
  - Button(s) with oAuth Provider(s)
  - Welcome message
  - Privacy Policy/Terms of Service (???)

Thought Card:

- [ ] Add back button to card
- [ ] Add more posts at bottom (timeline of user's thoughts)

Profile/Timeline:

- [ ] Add bookmarks of certain thoughts. Only the user's own thoughts though.

Frontend:

- [ ] Implement proper design system:

  - im thinking like a note taking sort of app. the sidebar could be a representation of a spiral notebook or bookmark system?
  - clean, modern but playful.
  - the whole interface should feel inviting for the user to spill their heart out, right now it feels like a corporate app.

- [x] Implement preloader for sessions:
  - This is important becuase the overall fluidity of the app will be improved, instead of shit just popping up we'll wait for the session to finish loading.
    - If user is authentcated: continue
    - If not: got to signin/signup (this will be done when I, well, implement signing up)
