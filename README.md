# Instagram Stories Feature

A mobile-first Instagram Stories clone built with vanilla HTML, CSS, and JavaScript. No external libraries are used for core functionality.

## 🎬 Live Demo

[View Live Demo](https://instagram-stories-features.vercel.app)

## ✨ Features

- **Horizontal Stories List** - Scrollable story circles with Instagram-style gradient borders
- **Dynamic Data Loading** - Stories fetched from external JSON file using Fetch API
- **Full-Screen Story Viewer** - Immersive overlay for viewing stories
- **Manual Navigation** - Tap left/right sides of the screen to navigate between stories
- **Auto-Advance** - Stories automatically transition after 5 seconds
- **Progress Bars** - Visual indicators showing story duration and position
- **Loading States** - Spinner displayed while images are loading
- **Smooth Transitions** - CSS animations for seamless user experience
- **Keyboard Support** - Arrow keys and Escape for desktop navigation

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Animations, Transitions)
- Vanilla JavaScript (ES6+)
- Fetch API

## 🚀 Deployment

### Local Development

1. Clone the repository:
   ```bash
   git clone <REPO_URL>
   cd Instagram-Stories-Features
   ```

2. Start a local server:
   ```bash
   python3 -m http.server 3000
   ```

3. Open `http://localhost:3000` in your browser.

### Vercel Deployment

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import your GitHub repository.
3. Vercel will auto-detect static files and deploy automatically.
4. Your app will be live at `https://your-project.vercel.app`.

## 🧩 Challenges Faced

### 1. Timer Synchronization
**Problem:** When manually navigating stories, the auto-advance timer would keep running, causing stories to skip unexpectedly.

**Solution:** Implemented `clearTimeout()` before every story change to reset the timer state.

### 2. Loading State Management
**Problem:** Stories would flicker or show blank screens before images loaded.

**Solution:** Added a loading spinner that displays until the image's `onload` event fires. The 5-second timer only starts after the image successfully loads.

### 3. Progress Bar Animation Reset
**Problem:** Progress bar animations wouldn't reset correctly when navigating backward.

**Solution:** Programmatically reset animation classes and inline styles on each story change before reapplying the animating class.

### 4. Cross-User Navigation
**Problem:** Moving between different users' stories required managing multiple state variables.

**Solution:** Created separate functions for user-level and story-level navigation with proper state resets.

## 📁 Project Structure

```
Instagram-Stories-Features/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Core JavaScript logic
├── stories.json        # External story data
├── vercel.json         # Vercel configuration
└── README.md           # Project documentation
```

## 👤 Author

**Antim Maurya**

## 📄 License

This project is open source and available for educational purposes.
