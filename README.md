
# VOCAB-SRPSKI

This is a small project I started to enforce my learning process. The main idea is to self-check how good you can say something in Serbian. The phrases allow one to practice both their vocabulary and grammar. The demo of the 2d stage of the project is currenctly available at [Github Pages](https://zverolen.github.io). Stage 3 is currently in developement

## Description of stage 2
The main tool for learning is cards that originally show a phrase in Russian and provide a way to see it in Serbian. Then the user can mark it as "correct" or "incorrect". In the UI those groups are called "I know (Знаю!)" and "I am learning(Учу!)" to avoid negative emotions when the answer is wrong.

## Technical Information (stage 3)

- React
- Redux for state management
- Supabase for the backend
- CSS Modules
- Design tokens

The UI is being designed in Figma using components.

## Accessibility

I do my best to make this app to comply with all WCAG 2.2 success criteria. Most things are considered during the development and full audit is performed before the end of each development stage.
The app is manually tested using screen readers. It kills me to admit that the current interface version and the whole workflow is not screen-reader friendly. Probably, same issues make it more confusing for any user to use the app. To fix it, I need to totally reimagine the workflow and interface, so I can come up with more usable intreface. This is going to be Stage 2 of the project. The app is quite operable for keyboard users, though.

## Testing

I rely a lot on automatic testing during my development process (React Testing LIbrary). I don't use full-scale TDD but in many cases I start making a feature with writing a test. I try to cover all interactive functionality in component tests and in end-to-end tests. Test files also serve as documentation and fix the current design and help to design and develop in isolation.

## Planned Features

1. New interface.
2. Experienced user mode.
3. No motion / no delay mode.
4. Button to switch between light and dark theme.
5. Skipping or hiding phrases.
6. Shuffling phrases.
7. Deviding phrases into smaller packs.

## Other ideas

1. Personalisation of the experience of a particular user: history, progress, etc.
2. Autocheck of typed-in phrases and announcement of phrases in Serbian. Maybe even checking the spoken phrases 🫢.
3. Deeper personalisation: user can add their own phrases for themselves and suggest phrases for the app.

## Me

Hi, I'm Elena. I'm a fronted developer and my level is middl-ish. In my work I focus on usability and accessibility and a huge part of my process consists of manual testing in screen-readers and writing automatic tests for the UI components. Also, I try to use the Modern CSS features as much as possible and learning those takes a big part of my process as well. A lot has changed since I last worked.

There's a huge gap in my career due to a maternity leave that went south. I've been working on waking up my skills and improving them for about a year with courses and a little bit of practice. This project is one of such efforts.

## Compliance with the WCAG 2.2 success criteria:

- [x] 1.1.1 Non-text Content (A)
- [x] 1.2.1 Audio-only and Video-only (Prerecorded) (A) (not present)
- [x] 1.2.2 Captions (Prerecorded) (A) (not present)
- [x] 1.2.3 Audio Description or Media Alternative (Prerecorded) (A) (not present)
- [x] 1.2.4 Captions (Live) (AA) (not present)
- [x] 1.2.5 Audio Description (Prerecorded) (AA) (not present)
- [x] 1.2.6 Sign Language (Prerecorded) (AAA) (not present)
- [x] 1.2.7 Extended Audio Description (Prerecorded) (AAA) (not present)
- [x] 1.2.8 Media Alternative (Prerecorded) (AAA) (not present)
- [x] 1.2.9 Audio-only (Prerecorded) (AAA) (not present)
- [x] 1.3.1 Info and Relationships (A)
- [x] 1.3.2 Meaningful Sequence (A)
- [x] 1.3.3 Sensory Characteristics (A)
- [x] 1.3.4 Orientation (AA)
- [x] 1.3.5 Identify Input Purpose  (AA) (not present)
- [x] 1.3.6 Identify Purpose (AAA)
- [x] 1.4.1 Use of Color (A)
- [x] 1.4.2 Audio Control (A) (not present)
- [x] 1.4.3 Contrast (Minimum) (AA)
- [x] 1.4.4 Resize Text (AA)
- [x] 1.4.5 Images of Text (AA) (not present)
- [ ] 1.4.6 Contrast (Enhanced) (AAA) (Reds and greens do not meet AAA contrast level)
- [x] 1.4.7 Low or No Background Audio  (AAA) (not present)
- [x] 1.4.8 Visual Presentation (AAA) (Color tested in Firefox, everything else verified too)
- [x] 1.4.9 Images of Text (No Exception) (AAA) (not present)
- [x] 1.4.10 Reflow (AA)
- [x] 1.4.11 Non-text Contrast (AA)
- [x] 1.4.12 Text Spacing (AA)
- [x] 1.4.13 Content on Hover or Focus (AA)
- [x] 2.1.1 Keyboard (A)
- [x] 2.1.2 No Keyboard Trap (A)
- [x] 2.1.3 Keyboard (No Exception) (AAA)
- [x] 2.1.4 Character Key Shortcuts (A) (not present)
- [x] 2.2.1 Timing Adjustable (A) (not present)
- [x] 2.2.2 Pause, Stop, Hide (A)
- [ ] 2.2.3 No Timing (With no reducing motion settings, the user has to wait a couple seconds after checking the card until the status change animation finishes and the card is removed) (AAA)
- [ ] 2.2.4 Interruptions (No functionality for making non-essential alerts optional) (AAA)
- [x] 2.2.5 Re-authenticating (AAA) (not present)
- [x] 2.2.6 Timeouts (AAA) (not present)
- [x] 2.3.1 Three Flashes or Below Threshold (A)
- [x] 2.3.2 Three Flashes (AAA)
- [x] 2.3.3 Animation from Interactions (AAA)
- [x] 2.4.1 Bypass Blocks (A)
- [x] 2.4.2 Page Titled (A)
- [x] 2.4.3 Focus Order (A)
- [x] 2.4.4 Link Purpose (In Context) (A)
- [x] 2.4.5 Multiple Ways (AA) (not present)
- [x] 2.4.6 Headings and Labels
- [x] 2.4.7 Focus Visible (AA)
- [x] 2.4.8 Location (AAA) (not present)
- [x] 2.4.9 Link Purpose (Link Only) (AAA)
- [ ] 2.4.10 Section Headings (AAA) (No visible headings are used for working area and no headings for groups of cards)
- [x] 2.4.11 Focus Not Obscured (Minimum) (AA)
- [ ] 2.4.12 Focus Not Obscured (Enhanced) (AAA) (Part of a focused button can be partially covered by the alert for about 4 seconds and the Disclosure button might be partially hidden behind the browser window - but more than 50% is visible in all cases)
- [x] 2.4.13 Focus Appearance (AAA)
- [x] 2.5.1 Pointer Gestures (A) (not present)
- [x] 2.5.2 Pointer Cancellation (A)
- [x] 2.5.3 Label in Name (A)
- [x] 2.5.4 Motion Actuation (A) (not present)
- [ ] 2.5.5 Target Size (Enhanced) (AAA) (Buttons are not as high as 44px)
- [x] 2.5.6 Concurrent Input Mechanisms (AAA)
- [x] 2.5.7 Dragging Movements (AA) (not present)
- [x] 2.5.8 Target Size (Minimum) (AA)
- [x] 3.1.1 Language of Page (A)
- [x] 3.1.2 Language of Parts (AA)
- [ ] 3.1.3 Unusual Words (AAA) (It’s not clear whether the words “Tab” (“Вкладка”) and “Github” need any annotation)
- [x] 3.1.4 Abbreviations (AAA) (not present)
- [ ] 3.1.5 Reading Level (AAA) (It’s not clear whether the words “Tab” (“Вкладка”) and “Github” need any annotation)
- [x] 3.1.6 Pronunciation (AAA) (not present)
- [x] 3.2.1 On Focus (A) (A new tab panel opens when a tab receives focus which doesn’t violate this criteria because it doesn’t change the context)
- [x] 3.2.2 On Input (A) (not present)
- [x] 3.2.3 Consistent Navigation (AA) (not present)
- [x] 3.2.4 Consistent Identification (AA)
- [x] 3.2.5 Change on Request (AAA)
- [x] 3.2.6 Consistent Help (A)
- [x] 3.3.1 Error Identification (A) (not present)
- [x] 3.3.2 Labels or Instructions (A)
- [x] 3.3.3 Error Suggestion (AA) (not present)
- [x] 3.3.4 Error Prevention (Legal, Financial, Data) (AA) (not present)
- [x] 3.3.5 Help (AAA) (not present)
- [x] 3.3.6 Error Prevention (All) (AAA) (not present)
- [x] 3.3.7 Redundant Entry (A) (not present)
- [x] 3.3.8 Accessible Authentication (Minimum) (AA) (not present)
- [x] 3.3.9 Accessible Authentication (Enhanced) (AAA) (not present)
- [x] 4.1.2 Name, Role, Value (A)
- [x] 4.1.3 Status Messages (AA)