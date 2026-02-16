# Speed Reading Trainer - Project Plan

## Overview

A single-page web application that helps users improve their reading speed through timed reading tests with comprehension checks and four specialized training exercises. Built with vanilla HTML/CSS/JS, Firebase for auth/persistence, and Chart.js for progress visualization.

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks, IIFE pattern)
- **Charts:** Chart.js v4
- **Auth/Database:** Firebase v10 (Auth + Firestore) with localStorage fallback
- **Routing:** Hash-based SPA routing
- **Build Tools:** None (direct browser loading)

## Architecture

```
index.html          Single HTML file with all screens (shown/hidden via SPA routing)
styles.css          Full application styling, dark theme, responsive breakpoints
app.js              All application logic (routing, auth, tests, exercises, charts, persistence)
texts.js            Reading text library with comprehension questions (TEXT_LIBRARY array)
```

### Routing

Hash-based SPA with screens toggled by `display: none`. Routes map to `<section>` elements:

| Route | Screen | Description |
|-------|--------|-------------|
| `#dashboard` | Default landing | Stats overview, chart, recent sessions |
| `#test-setup` | Text selection | Filterable grid of reading texts |
| `#test-active` | Reading test | Timed reading with live WPM |
| `#test-questions` | Comprehension quiz | Multiple-choice after reading |
| `#test-results` | Results summary | WPM, comprehension, adjusted WPM |
| `#exercises` | Exercise menu | Grid of 4 exercise types |
| `#exercise-rsvp` | RSVP Trainer | Single-word flash at target WPM |
| `#exercise-chunking` | Chunking Trainer | Flash word groups, pick from options |
| `#exercise-eyespan` | Eye Span Widener | Peripheral word identification |
| `#exercise-pacer` | Pacer Reading | Line-by-line highlight at target WPM |
| `#progress` | Progress tracking | Charts, stats, session history |

### Data Flow

- **Guest users:** Sessions stored in localStorage (`speedreader-sessions`)
- **Signed-in users:** Sessions stored in Firestore (`sessions` collection, keyed by `uid`)
- **Migration:** On first sign-in with existing local data, a modal offers to import local sessions to Firestore

## Features

### Reading Tests

- Text library with 16 passages across 3 difficulty levels and 3 length categories
- Each text includes title, author, genre, content, and 3-4 comprehension questions
- Genres: Fable, Fiction, Science, Literary Fiction, Thriller, Historical Fiction, Psychological Fiction, Science Fiction
- Timer starts after 500ms orientation delay
- Live WPM displayed after ~3 seconds of reading
- Comprehension quiz with answer highlighting, explanations, and correct/incorrect feedback
- Results: raw WPM, comprehension %, adjusted WPM (raw WPM x comprehension), reading time
- Contextual feedback message based on WPM range and comprehension score

### Training Exercises

#### RSVP Trainer
- Configurable starting WPM (100-800, step 25)
- Text selection from library
- Optional auto-acceleration (+25 WPM every 30 seconds)
- ORP (Optimal Recognition Point) highlighting on each word
- Extra pause on sentence-ending punctuation
- Progress bar, pause/resume, stop controls

#### Chunking Trainer
- Words sourced from a random library text
- Flash a word chunk, then pick it from 4 options
- Adaptive difficulty:
  - Display time decreases by 50ms every 3 consecutive correct (min 200ms)
  - Chunk size increases by 1 every 5 consecutive correct (max 5 words)
- Tracks score and streak

#### Eye Span Widener
- Row of words with center fixation point (+)
- Target word highlighted peripherally, then hidden
- Pick the target from 4 options (distractors from the row or word pool)
- Adaptive difficulty:
  - Span increases by 1 every 5 consecutive correct (max 9 words)
  - Display time decreases by 50ms every 5 consecutive correct (min 200ms)
- Tracks score, span, and accuracy %

#### Pacer Reading
- Configurable target WPM (100-800, step 25)
- Text split into ~10-word lines
- Active line highlighted and auto-scrolled
- Real-time speed adjustment (+/- 25 WPM buttons)
- Pause/resume, stop controls

### Dashboard

- Hero WPM display (latest reading test result) with trend arrow (up/down/flat)
- Stats row: sessions count, average WPM, best WPM, comprehension %
- Mini line chart of last 30 reading test sessions (Chart.js)
- Quick action buttons: Start Reading Test, Training Exercises
- Recent 5 sessions list (all types)

### Progress Tracking

- Summary stats: best WPM, average WPM, total sessions, day streak, words read, time spent
- Line chart with raw WPM and adjusted WPM (dashed), filterable by 30/60/90 days
- Full session history table (type, date, WPM, comprehension)

### Auth

- Google sign-in via Firebase Auth popup
- User avatar and name display in nav bar
- Sign out button
- Data migration modal for importing localStorage sessions on first sign-in

## Text Library (texts.js)

| ID | Title | Author | Difficulty | Length |
|----|-------|--------|------------|--------|
| aesop-tortoise-hare | The Tortoise and the Hare | Aesop | easy | short |
| aesop-fox-grapes | The Fox and the Grapes | Aesop | easy | short |
| twain-jumping-frog | The Celebrated Jumping Frog | Mark Twain | easy | short |
| original-elevator | The Elevator | Original | easy | short |
| original-octopus | The Octopus Problem | Original | easy | short |
| original-chess | The Ghost Move | Original | easy | medium |
| original-dolphins | What Dolphins Talk About | Original | easy | medium |
| london-fire | Building a Fire in the Wild | Jack London | easy | medium |
| doyle-observation | The Science of Observation | Arthur Conan Doyle | easy | medium |
| original-cartographer | The Midnight Cartographer | Original | medium | medium |
| original-memory-auction | The Memory Auction | Original | medium | medium |
| original-beekeeper | The Last Beekeeper of Gascony | Original | medium | medium |
| original-sleep | Why We Dream | Original | medium | long |
| original-forgery | The Forger's Dilemma | Original | medium | long |
| original-mycelium | The Wood Wide Web | Original | hard | long |
| original-deep-time | Deep Time | Original | hard | medium |
| original-lighthouse | The Keeper of North Point Light | Original | hard | long |
| original-fermi | The Great Silence | Original | hard | long |

## UI/UX

- Dark theme (background #0f0f0f, surfaces #1a1a1a/#242424, accent #6c63ff purple)
- Responsive design with breakpoints at 700px and 400px
- Screen transitions with fade-in animation
- Sticky top navigation with active state highlighting
- Keyboard shortcuts:
  - `Escape`: Navigate back (exercise -> menu, test -> setup, default -> dashboard)
  - `Space`: Pause/resume RSVP and Pacer exercises

## Setup

### Firebase Configuration

The app requires a Firebase project. Replace the placeholder values in `app.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "000000000",
  appId: "YOUR_APP_ID"
};
```

Firebase services needed:
- **Authentication:** Google sign-in provider enabled
- **Firestore:** Collections: `sessions` (reading data), `users` (last session timestamp)

### Running Locally

No build step required. Serve the directory with any static file server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .

# VS Code
# Use the Live Server extension
```

The app also works without Firebase — guest mode uses localStorage for all data persistence.

## Potential Future Enhancements

- [ ] Connect Firebase with real project credentials
- [ ] Add more texts to the library
- [ ] Custom text input (paste your own content)
- [ ] Export/import session data (JSON/CSV)
- [ ] Dark/light theme toggle
- [ ] Per-exercise session saving and progress tracking
- [ ] Peripheral vision training with variable distances
- [ ] Timed reading challenges with leaderboards
- [ ] Sub-vocalization reduction exercises
- [ ] PWA support (offline mode, installable)
- [ ] Accessibility improvements (screen reader support, high contrast mode)
