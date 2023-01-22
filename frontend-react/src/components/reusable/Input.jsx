export function InputWithIcon({type, placeholder, value, onChange, icon, color}) {
  return (
    <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white rounded mb-4">
    <div className="flex -mr-px justify-center w-15 p-4">
          <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600" >
            {icon}
          </span>
    </div>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    min="3" className={`flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative text-xl outline-none ${color}`}/>
  </div>
  )
}

export function Input({type, placeholder, value, onChange}) {
  return (
    <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white rounded mb-4">
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} 
    min="3" className={`flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 border-grey-light rounded px-3 self-center relative text-xl outline-none ${color}`}/>
  </div>
  )
}
