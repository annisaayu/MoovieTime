/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary:'#E5E5E5',
        secondary:'',
        accent: '#E74C3C',
        'custom-color': '#0E1723',
        'custom-color-2': '#1E232A00',
        'black-90': '#000000E5',
        'black-80': '#000000CC',
        'black-20': '#00000033',
        'black-50': "#00000080",
        red: '#FF0000',
        'green-200': "#A9FFC6",
        green: "#155129",
        darkgrey: '#1E232B',
        background: {
          light: '#FFFFFF',
          dark: '#0000004A',
          accent: '#E0E0E021',
          transparent: '#FFFFFF0D',
          accent2:'#1E232BCC',
          accent3: "#00000021",
        },
        text: {
          green: "#155129",
          primary: '#000000',
          secondary: '0000004A',
          dark: '#1E232A',
          link: '#E74C3C',
          heading:'#E5E5E5',
          subheading: '#929292',
          subtitle: '#FFFFFF80'
        }
      }
    },
  },
  plugins: [],
}

