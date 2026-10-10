## Why does this matter?

Links are what make the web a *web*: pages connected to other pages. And lists are everywhere: navigation menus, recipe steps, shopping carts, search results. You'll use both on almost every page you build.

## Links: doors between pages 🚪

A link is a **door** that takes you somewhere else. You make one with the `<a>` tag (short for "anchor"), and `href` is the **address** the door leads to:

```html
<a href="https://developer.mozilla.org">MDN Web Docs</a>
```

- `href="..."` is an **attribute**: extra information written inside the opening tag.
- The text between the tags is what people click.

### Full addresses and short addresses

- An **absolute** URL is a full street address, including the city: `https://example.com/about.html`. Use it to link to *other* websites.
- A **relative** URL is like saying "next door": `about.html` or `pages/contact.html`. Use it for pages on *your own* site.

### Jumping to a spot on the same page

Give any element an `id` (a unique name tag), then link to it with `#`:

```html
<a href="#recipe">Jump to the recipe</a>
...
<h2 id="recipe">Pancakes</h2>
```

### Other handy links

- **Open in a new tab:** add `target="_blank"`. Always pair it with `rel="noopener noreferrer"` for safety.
- **Email:** `<a href="mailto:chef@example.com">Email the chef</a>` opens the visitor's email app.

**Good link text says where the door goes.** "Read the pancake recipe" is much better than "click here". People using screen readers often hear only the list of links on a page.

## Lists 📝

### Unordered lists: when order doesn't matter

A shopping list. Each item goes in an `<li>` (**l**ist **i**tem) inside a `<ul>` (**u**nordered **l**ist):

```html
<ul>
  <li>Eggs</li>
  <li>Flour</li>
  <li>Milk</li>
</ul>
```

### Ordered lists: when order matters

Recipe steps. Use `<ol>` (**o**rdered **l**ist), and the browser numbers them for you:

```html
<ol>
  <li>Mix the ingredients</li>
  <li>Heat the pan</li>
</ol>
```

### Lists inside lists

A list can go **inside an `<li>`**, like sub-points:

```html
<ol>
  <li>
    Mix the ingredients:
    <ul>
      <li>2 eggs</li>
      <li>1 cup of flour</li>
    </ul>
  </li>
</ol>
```

### Description lists: a mini dictionary 📖

For terms and their meanings, use `<dl>` with `<dt>` (the term) and `<dd>` (the description):

```html
<dl>
  <dt>Whisk</dt>
  <dd>To mix quickly with a fork or whisk.</dd>
</dl>
```

### Menus are lists of links

A site's menu is simply an unordered list where every item is a link. You'll see this pattern on almost every website.

## Remember ✅

- `<a href="...">` makes a link; `href` is the address. Make the link text describe where it goes.
- Absolute URLs for other sites, relative URLs for your own; `#id` jumps within the page.
- `<ul>` when order doesn't matter, `<ol>` when it does, and every item is an `<li>`.
- Lists can go inside an `<li>`; `<dl>` is for terms and descriptions.
