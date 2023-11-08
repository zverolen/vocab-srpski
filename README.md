# VOCAB-SRPSKI

The latest public version is hosted here: [https://zverolen.github.io/](https://zverolen.github.io/).

This is a small project I started to enforce my learning process. The main idea is to self-check how good you can say something in Serbian. The phrases allow one to practice both their vocabulary and grammar.

The tool for that are cards that originally show a phrase in Russian and provide a way to see it in Serbian and mark it as "correct" or "incorrect". In the UI those groups are called "I know" and "I am learning" to avoid negative emotions when the answer is wrong.

The project is in its early stage and more useful features are on their way. Currently all phrases are kept in the file system and added manualy.

## Technical Information
The project is using Vite.js. The tests are run by Cypress. The styles are written in vanilla CSS and heavily rely on the Modern CSS features and intrinsic design.

The UI is being designed in Figma using components.

## Accessibility
I do my best to make this app to comply with all WCAG 2.2 success criteria. Most things are considered during the development and full audit is performed before the end of each development stage.
The app is manually tested using screen readers. I don't like how it is working right now. There are a few major issues with the UX. Those issues are probably affecting the visual usage of the app. But, to address them, the full interface has to be redesigned. Which I'm planning to do at some point. Meahwhile, the app is as accessible and as usable as I could do it.

## Testing
I heavily rely on automatic testing during my development process. I don't use full-scale TDD but in many cases I start making a feature with writing a test. I also try to cover all interactive functionality in component tests and in end-to-end tests. Test files also serve as documentation and fix the current design.

## Tasks remaining
1. Updating tests.
2. Writing missing tests.
3. Updating CSS and design tokens.
4. Documenting everything in the design system in Penpot.

## Planned Features
1. Experienced user mode.
2. No motion / no delay mode.
3. Button to switch between light and dark theme.
4. Skipping or hiding phrases.
5. Shuffling phrases.
6. Deviding phrases into smaller packs.

## Other ideas
1. Redesing of UI so that working with phrases became more convenient for mouse, keyboard and screen-reader users.
2. Moving phrases to a headless CMS.
3. Personalisation of the experience of a particular user: history, progress, etc.
4. Autocheck of typed-in phrases and announcement of phrases in Serbian. Maybe even checking the spoken phrases 🫢.
5. Deeper personalisation: user can add their own phrases for themselves and suggest phrases for the app.

## Me
Hi, I'm Elena. I'm a fronted developer and my level is middl-ish. In my work I focus on usability and accessibility and a huge part of my process consists of manual testing in screen-readers and writing automatic tests for the UI components. Also, I try to use the Modern CSS features as much as possible and learning those takes a big part of my process as well. A lot has changed since I last worked.

There's a huge gap in my career due to a maternity leave that went south. I've been working on waking up my skills and improving them for about a year with courses and a little bit of practice. This project is one of such efforts.
