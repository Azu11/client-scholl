import { Outlet } from 'react-router-dom'
import DrawerTeacher from '../components/DrawerTeacher'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

export default function PrivateRoot () {
  return (
    <>
      <Nav>
        <DrawerTeacher />
      </Nav>
      <main
        style={{ minHeight: '85vh' }}
        className='flex justify-center items-center'
      >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
