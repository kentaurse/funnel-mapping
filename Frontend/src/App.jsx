import { Outlet } from "react-router-dom";
import Header from 'src/components/Header';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';
import 'src/components/Notification'
import { axiosSetting } from 'src/components/AxiosSetting'

axiosSetting();

function App() {
  return (
    <div className="App flex h-screen overflow-hidden">
      <Menu />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="h-full overflow-y-auto">
          <div className="main min-h-[779px] bg-base-300 p-2 rounded-md">
            <Outlet/>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
