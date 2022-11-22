const Theme = {
  breakpoints: {
    Mobile: '479px',
    TabletMin: '768px',
    TabletMax: '1023px',
    Desktop: '1024px',
  },

  // @media (max-width: ${(props) => props.theme.breakpoints.TabletMin}) {
  //   TabletMin 이하 화면에서는 display:none;
  //   display: none;
  // }

  color: {
    Btn: '#00c7ae',
    Red: '#E2445C',
    Orange: '#FDAB3D',
    Yellow: '#FFCB00',
    SkyBlue: '#579BFC',
    PastelBlue: '#35a3dc',
    Blue: '#007bff',
    Green: '#00C875',
    LightGreen: '#9CD326',
  },

  backgroundColor: {
    LightBlue: 'rgba(0, 123, 255, 0.1)',
  },
};

export default Theme;
