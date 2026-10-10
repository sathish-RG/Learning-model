## Your mission: lay out Task Manager Pro

Right now the header is plain, and the two task cards are squashed together. Let's fix that.

1. **Space out the cards.** Add `grid gap-4` to the `class` of the `<main>` tag.
2. **Two columns on big screens.** Also add `md:grid-cols-2` to `<main>`. Make the preview wider and narrower to watch it change.
3. **Give the header a button.** Add `flex justify-between items-center` to the `<header>`, then put a `<button>` with the text `+ Add task` inside it, after the title.

**Bonus:** style your button with Tailwind stickers like `bg-emerald-500 text-white rounded-lg px-3 py-1`.

✅ **You're done when** the title and button sit on the same line, and the cards are side by side on a wide preview.
