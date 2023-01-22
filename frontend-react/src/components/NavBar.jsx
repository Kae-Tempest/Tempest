import logo from '@/assets/Logo.png' 
import { useStoreState, useStoreActions  } from 'easy-peasy'
import { Link, useLocation } from 'react-router-dom'

export function NavBar() {
    const connect = useStoreState(state => state.connect)
    const setConnect = useStoreActions((actions) => actions.setConnect)
    const pathname = useLocation().pathname
  return (
    <nav className='bg-ctp-crust'>
        <div className='flex justify-between h-24'>
        <Link to='/'>
            <div className='flex items-center px-2 pt-3 gap-4'>
                <img src={logo} alt="logo" className='h-20 w-20'/>
                <span className='text-5xl font-["Arial_Black"]'>GuacaStorm</span>
            </div>
        </Link>
            <div className='text-3xl flex items-center pr-[4rem] font-["Arial_Black"]'>
                {!connect ? 
                pathname === '/login' ?
                <Link to='/signup'>Signup</Link> : <Link to='/login'>Login</Link> :  <button onClick={() => setConnect(false)}>Logout</button>}
            </div>
        </div>
    </nav>
  )
}
