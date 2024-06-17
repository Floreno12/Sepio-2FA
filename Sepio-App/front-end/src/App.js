// import React from 'react';
// import { useState } from 'react';
// import './App.css';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import SignUp from './components/SignUp';
// import RootView from './components/RootView';
// import LogsPage from './components/LogsPage'
// import MAC from './components/MAC'
// import Settings from './components/Settings';
// import SearchHistory from './components/SearchHistory';
// import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
// import 'primereact/resources/primereact.min.css';           // Core CSS
// import 'primeicons/primeicons.css';   
// import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI CSS


// function App() {
// 	const [icon_username, setUsername] = useState('');
//   return (
//     <Router>
//       <section className = 'sepio'>
//     <div className="App">
//       <Routes>
// 			<Route path='/' element={<SignUp setUsername={setUsername} />}/>
// 					  <Route path='/querytool' element={<RootView icon_username={icon_username} />}/>   
//         {/* <Route path = '/querytool/logs' element = {<LogsPage/>}/>   */}
//         <Route path = '/querytool/mac' element = {<MAC icon_username={icon_username}/>}/> 
//         {/* <Route path = '/querytool/searchhistory' element = {<SearchHistory/>}/>   */}
//         <Route path = '/querytool/settings' element = {<Settings icon_username={icon_username}/>}/>
//       </Routes>

//     </div>
//     </section>
//     </Router>
//   );
// }

// export default App;









import React from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import FA from './components/FA';
import RootView from './components/RootView';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';   
import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI CSS


function App() {
  const [icon_username, setUsername] = useState('');
  return (
    <Router>
      <section className='sepio'>
        <div className="App">
          <Routes>
            <Route path='/' element={<SignUp setUsername={setUsername} />} />
            <Route path='/2fa' element={<FA />} />
            <Route path='/querytool' element={<RootView icon_username={icon_username} />}/> 
          </Routes>
        </div>
      </section>
    </Router>
  );
}

export default App;

