import React from 'react';
import Main from "./src/Main";
import * as ScreenOrientation from 'expo-screen-orientation'
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
const App = ()=>{
  return (
    <Main></Main>
  )
}

export default App;