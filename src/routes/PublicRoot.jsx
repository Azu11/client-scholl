import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import UserDropdown from '../components/UserDropdown'

export default function PublicRoot () {
  return (
    <>
      <Nav>
        <UserDropdown />
      </Nav>
      <main style={{ minHeight: '85vh' }} className='flex justify-center items-center'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
