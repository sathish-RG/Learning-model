## Why does this matter?

Pictures and videos make pages come alive. Product photos sell things, diagrams explain ideas, and videos teach. But every image also needs a text description, so that people who can't see it still get the message.

## Images: a picture frame 🖼️

The `<img>` tag is like a **picture frame on the wall**. The frame is on your page, but the photo itself is stored somewhere else. `src` (**s**ou**rc**e) says where to find it:

```html
<img
  src="https://example.com/photos/elephant.jpg"
  alt="An elephant splashing water over its back"
  width="660"
  height="480"
/>
```

`<img>` is a **void element**, so it has no closing tag. Everything it needs goes in attributes.

## alt text: describing the picture on the phone ☎️

Imagine describing the photo to a friend over the phone. That's what `alt` (alternative text) is for. It's read aloud by screen readers, and shown if the image fails to load.

- ✅ `alt="An elephant splashing water over its back"`: describes what matters
- ❌ `alt="image"` or `alt="elephant.jpg"`: tells the listener nothing

If an image is **pure decoration** (a squiggly divider, a background pattern), use an empty `alt=""`. That tells screen readers to skip it.

## width and height: saving a seat

Add the image's `width` and `height` (in pixels). The browser can then **save the right amount of space** before the image arrives, so the text doesn't jump around while the page loads.

## Captions: the label in a museum 🏛️

To give an image a visible caption, put both inside a `<figure>`, like a painting with its label card:

```html
<figure>
  <img src="surfer.jpg" alt="A surfer riding a small wave" width="240" height="200" />
  <figcaption>Catching the morning waves.</figcaption>
</figure>
```

The `alt` describes the image itself; the `<figcaption>` adds extra information that everyone sees.

## Which image format?

- **JPG**: photos
- **PNG**: images that need transparency, or have sharp edges like screenshots
- **SVG**: logos and icons (they stay sharp at any size)
- **WebP**: a modern format that's smaller than JPG and PNG

## Video and audio 🎬

`<video>` and `<audio>` work similarly. Add `controls` so visitors get play, pause and volume buttons:

```html
<video controls width="320">
  <source src="flower.webm" type="video/webm" />
  <source src="flower.mp4" type="video/mp4" />
  Sorry, your browser can't play this video.
</video>
```

- **Several `<source>` tags** give the browser a choice of formats; it plays the first one it supports.
- **The text inside** only shows up if video can't play at all.
- **Useful extras:**
  - `muted`: no sound
  - `loop`: start again when finished
  - `autoplay`: start playing on its own. Browsers only allow this when the video is `muted`.
  - `poster="cover.jpg"`: a picture to show before the video starts

## Embedding other sites

`<iframe>` puts another web page inside yours, like a window. That's how YouTube videos and Google Maps get embedded:

```html
<iframe src="https://www.example.com" title="Example website" width="400" height="300"></iframe>
```

Always give an iframe a `title`, so screen-reader users know what's in the window.

## Remember ✅

- `<img src="..." alt="...">` is a frame pointing at a photo; it has no closing tag.
- Write `alt` text as if describing the picture on the phone; use `alt=""` for decoration.
- `<figure>` + `<figcaption>` gives an image a visible caption.
- `<video controls>` with `<source>` tags plays video, with fallback text inside.
