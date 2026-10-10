## Your mission: bring the shopping list to life

The page (`index.html` and `styles.css`) is locked; write your code in `app.js`. Peek at `styles.css` to see the classes you can switch on. Watch both the **page** and the **console**.

1. **Change the title.** Select the element with the id `title` and change its text to `My Shopping List`. Log the new text.
2. **Build the list.** For each item in the `items` array, create an `li`, set its text, and append it to the `#list` element.
3. **Highlight the first item.** Add the class `highlight` to the first `li` in the list.
4. **Cross off the eggs.** Select **all** the list items, loop over them, and add the class `done` to the one whose text is `Eggs`.
5. **Count the items.** Count the list items with `querySelectorAll(...).length`. Set the `.status` paragraph's text to `4 items` (using the real count), and log the count.
6. **Hide the tip.** Add the class `hidden` to the `.tip` paragraph.

✅ **You're done when** the page shows `My Shopping List` with 4 items, the first one highlighted, `Eggs` crossed out, `4 items` below the list and no tip; and the console shows `My Shopping List` and `4`.
