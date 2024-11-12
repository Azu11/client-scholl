import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DrawerTeacher from '../components/DrawerTeacher'

export default function PrivateRoot () {
  return (
    <>
      <Nav>
        <DrawerTeacher />
      </Nav>
      <main style={{ minHeight: '85vh' }} className='flex justify-center items-center'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
