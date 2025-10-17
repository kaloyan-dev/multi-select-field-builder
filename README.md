# Multi-Select Field Builder

#### Preview: https://multi-select-field-builder.vercel.app/

---

### Local Installation

- clone the repo
- run `npm install`
- then run `npm run dev`

For unit tests run `npm test`.

---

### Notes

For the purposes of this demo (and easier setup) the app uses a hardcoded endpoint which is configured to match the requested payload. This will save you the need to create an `.env` file if you decide to test it locally.

### What was done with AI in agent mode (low risk, big wins) 💪🤖

- the contents of the unit test files
- refactoring the code into separate files for most of the components
- the additional code needed to make choices list drag-and-drop-able (to save hours of going through the react-dnd documentation). Outside of the code for drag and drop, the functionality for adding/removing choices was **not** done with an agent

### What was done with AI outside agent mode (ChatGPT/Copilot) 🤖👀

- the initial version of the `toCamelCase` utility function (which was later updated manually to cover a missed unit test case)
- the SVG code for the `Spinner` component
- alias setup (`./src/*` -> `@/*`)

### What was done by a human (me) 🤓

- vite setup
- dependencies install
- folder structure
- UI "redesign"
- ... pretty much everything else in the code that was not mentioned in the AI sections above
