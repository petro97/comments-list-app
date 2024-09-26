export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cons: {
          gray: {
            DEFAULT: '#767676'
          },
          blue: {
            DEFAULT: '#2F5497',
            'step-down': {
              DEFAULT: '#104497'
            }
          },
          green: {
            DEFAULT: '#38AD6A',
            'step-up': {
              DEFAULT: '#6B9CAC'
            }
          },
          red: {
            DEFAULT: '#DE350A'
          },
          white: '#ffffff',
          almostBlack: '#252525'
        }
      }
    }
  },
  plugins: []
}
