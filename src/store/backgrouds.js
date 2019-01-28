export default {
  state: {
    backgrounds: [
      {
        color: '#00AECC',
        checked: false
      },
      {
        color: '#529838',
        checked: false
      },
      {
        color: '#B27B2D',
        checked: false
      },
      {
        color: 'linear-gradient(to right, #2980b9, #2c3e50)',
        checked: false
      },
      {
        color: 'linear-gradient(to right, #ff4b1f, #ff9068)',
        checked: false
      },
      {
        color: 'linear-gradient(to right, #485563, #29323c)',
        checked: false
      },
      {
        color: 'linear-gradient(to right, #4ecdc4, #556270)',
        checked: false
      },
      {
        color: 'linear-gradient(to right, #add100, #7b920a)',
        checked: false
      }
      ,
      {
        color: 'linear-gradient(to right, #654ea3, #eaafc8)',
        checked: false
      },
    ]
  },

  getters: {
    backgrounds: state => state.backgrounds
  }
}