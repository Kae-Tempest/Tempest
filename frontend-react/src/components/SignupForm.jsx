import axios from 'axios'
import { useState } from 'react'
import logo from '@/assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { InputWithIcon } from '@/components/reusable/Input'
import { CustomButton } from '@/components/reusable/CustomButton'
import { HiOutlineUserCircle, HiOutlineLockClosed, HiAtSymbol } from 'react-icons/hi2';
import { useStoreActions  } from 'easy-peasy'
import { URL_API } from '../../config'


export function SignupForm() {
    const setConnect = useStoreActions((actions) => actions.setConnect)
    const naviate = useNavigate()
    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirm_password, setConfirm_Password ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post(`http://${URL_API}/signup`,{
                name: username,
                email: email,
                password: password,
                confirm_password: confirm_password
              })
            setConnect(true)
            naviate('/')
        } catch (err) {
            console.log(err)
            setError(err.response.data.msg)
        }
    }

  return (
    <div id="screen" className="w-full grid place-items-center">
        <div className="flex-col flex mx-auto items-center w-full lg:w-1/3 md:w-3/5 p-5 bg-ctp-surface1 border rounded-xl border-white bg-">
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col w-full">
            <div className="text-ctp-red text-xl text-center">
                { error }
            </div>
                <div className="flex justify-end h-10">
                    <div className="scale-[0.25] translate-x-32 -translate-y-20">
                        <img src={logo} alt="logo" className=" -translate-y-4 translate-x-28 scale-150 rotate-[28deg]" />
                    </div>
                </div>
                <InputWithIcon color="text-ctp-crust font-['Arial_Black']" icon={<HiOutlineUserCircle/>} placeholder="Username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                <InputWithIcon color="text-ctp-crust font-['Arial_Black']" icon={<HiAtSymbol/>} placeholder="Email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <InputWithIcon color="text-ctp-crust font-['Arial_Black']" icon={<HiOutlineLockClosed/>} placeholder="Password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <InputWithIcon color="text-ctp-crust font-['Arial_Black']" icon={<HiOutlineLockClosed/>} placeholder="Confirm Password" type="password" value={confirm_password} onChange={(e) => {setConfirm_Password(e.target.value)}}/>
                <CustomButton bgColor="bg-ctp-overlay2" textColor="text-white" size="w-1/3" name="Sign in" font="font-['Arial_Black']"/>
            </form>
        </div>
    </div>
  )
}
