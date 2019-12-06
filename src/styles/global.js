import { createGlobalStyle } from 'styled-components';

import background from '../assets/background.svg';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

* {
  margin:0;
  padding:0;
  outline:0;
  box-sizing:border-box;
 }

body{
  background: #202020 url(${background}) no-repeat center top;
}

#root{
  max-width:1020px;
  margin:0 auto;
  padding:0 20px 50px;
}

.toast-container{
  font-size:1.5rem;
}

html{
  -webkit-font-smoothing:antialiased;
  font-family:Roboto, sans-serif;
  font-size:62.5%;
}

button{
  cursor:pointer;
  border:0;
  background:none;
}

strong {
 font-size: 1.5rem;
}

`;
