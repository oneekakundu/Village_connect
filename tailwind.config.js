/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f6f3',
          100: '#f0ebe4',
          200: '#e1d5c7',
          300: '#ceb8a3',
          400: '#b8967d',
          500: '#8b6f47',
          600: '#7a5f3e',
          700: '#654f34',
          800: '#54422e',
          900: '#473829',
        },
        accent: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bce5cc',
          300: '#8fd1a8',
          400: '#5bb57c',
          500: '#4a9960',
          600: '#3a7b4c',
          700: '#2f623e',
          800: '#284f34',
          900: '#22412c',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        terracotta: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fad9c0',
          300: '#f6be95',
          400: '#f19968',
          500: '#ed7544',
          600: '#de5a2a',
          700: '#b84620',
          800: '#93391f',
          900: '#76311e',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7d917d',
          500: '#627562',
          600: '#4e5d4e',
          700: '#414a41',
          800: '#373d37',
          900: '#2f332f',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'hindi': ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        'bengali': ['Noto Sans Bengali', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'patachitra': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"patachitra\" x=\"0\" y=\"0\" width=\"50\" height=\"50\" patternUnits=\"userSpaceOnUse\"%3E%3Ccircle cx=\"25\" cy=\"25\" r=\"8\" fill=\"%23ed7544\" opacity=\"0.1\"/%3E%3Cpath d=\"M15 15 Q25 5 35 15 Q25 25 15 15\" fill=\"%234a9960\" opacity=\"0.08\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100\" height=\"100\" fill=\"url(%23patachitra)\"/%3E%3C/svg%3E')",
        'rangoli': "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"rangoli\" x=\"0\" y=\"0\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\"%3E%3Cpolygon points=\"20,5 30,15 20,25 10,15\" fill=\"%23eab308\" opacity=\"0.06\"/%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"3\" fill=\"%23de5a2a\" opacity=\"0.08\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"80\" height=\"80\" fill=\"url(%23rangoli)\"/%3E%3C/svg%3E')",
        'madhubani': "url('data:image/svg+xml,%3Csvg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"madhubani\" x=\"0\" y=\"0\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M30 10 Q40 20 30 30 Q20 20 30 10\" fill=\"%234a9960\" opacity=\"0.05\"/%3E%3Cpath d=\"M10 30 L20 25 L30 30 L20 35 Z\" fill=\"%23ed7544\" opacity=\"0.07\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"120\" height=\"120\" fill=\"url(%23madhubani)\"/%3E%3C/svg%3E')",
        'warli': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"warli\" x=\"0\" y=\"0\" width=\"30\" height=\"30\" patternUnits=\"userSpaceOnUse\"%3E%3Ccircle cx=\"15\" cy=\"15\" r=\"2\" fill=\"%23eab308\" opacity=\"0.1\"/%3E%3Cpath d=\"M10 10 L20 10 L15 20 Z\" fill=\"%234a9960\" opacity=\"0.06\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"60\" height=\"60\" fill=\"url(%23warli)\"/%3E%3C/svg%3E')",
        'grain': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.02\"/%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-1deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
};