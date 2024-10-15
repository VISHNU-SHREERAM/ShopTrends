import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import {Header, Footer} from './components/HeaderFooter'
import "./App.css"


function App() {
  const [page, setPage] = useState("charts");
  const ChangePage = (pageNumber) => {
    setPage(pageNumber)
  }
  return (
    <div className='App'>
      <Header></Header>
      <div className='Content'>
        <Sidebar ChangePage={ChangePage}></Sidebar>
        <Dashboard page={page}></Dashboard>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App