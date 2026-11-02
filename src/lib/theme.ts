// Shared with the static v2 pages in public/v2: same localStorage key and the
// same `night` class on <html>, so the choice carries across the whole site.
export const THEME_KEY = "v2-night";

// Runs inline in <head> before first paint so there's no flash of the wrong
// theme. A saved choice wins; otherwise follow prefers-color-scheme.
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var n=s==='1'||(s===null&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('night',!!n)}catch(e){}})();`;
