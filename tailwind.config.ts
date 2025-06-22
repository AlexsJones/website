export default {
  theme: {
    extend: {
      colors: {
        hacker: {
          DEFAULT: '#39FF14', // neon green
          dark: '#0f0',
        },
        background: {
          DEFAULT: '#111',
        },
      },
      fontFamily: {
        mono: [
          'Geist Mono',
          'Fira Mono',
          'IBM Plex Mono',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      boxShadow: {
        'hacker-glow': '0 0 8px #39FF14, 0 0 16px #39FF14',
      },
    },
  },
}; 