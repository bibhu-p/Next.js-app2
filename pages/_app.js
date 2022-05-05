import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  if (Component.getLayout){
    return Component.getLayout(<Component {...pageProps}/>)
  }
  return (
    <>
    <NavBar/>
    {/* <div className='flex flex-row'> */}
    {/* <SideBar/> */}
    <Component {...pageProps} />
    {/* </div> */}

    </>
  )
}

export default MyApp
