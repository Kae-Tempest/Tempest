import { HiOutlineXMark } from 'react-icons/hi2';

export function DayDataModal({data , onClose}) {
    let dateArray = [];
    data.map((item) => {
        let date = new Date(Number(item.mesured_at))
        date = `${date.getDate().toString().padStart(2, '0')} | ${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;
        dateArray.push(date);
    })

  return (
    <div>
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-[1001] outline-none focus:outline-none justify-center items-center flex bg-ctp-crust/75" onClick={onClose}>
            <div className="relative w-full h-screen max-w-7xl">
                <div className="relative rounded-lg shadow-lg bg-ctp-base border border-ctp-peach">
                    <div className="flex items-center p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl text-ctp-text ml-auto font-['Arial_Black']"> Last 24h Reports</h3>
                        <button type="button" className="text-red-400 bg-transparent ml-auto text-sm p-1.5 inline-flex items-center" onClick={onClose}>
                            <HiOutlineXMark size={32}/>
                        </button>
                    </div>
                    <div id="screen" className="relative overflow-y-auto shadow-md">
                        <table className="w-full text-sm text-center text-gray-400">
                            <thead className="uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="text-ctp-text px-6 py-3 font-['Arial_Black']">Temperature</th>
                                    <th scope="col" className="text-ctp-text px-6 py-3 font-['Arial_Black']">Humidity</th>
                                    <th scope="col" className="text-ctp-text px-6 py-3 font-['Arial_Black']">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-700 font-['Arial_Black']">
                                        <td className="text-ctp-text px-6 py-4">{item.temperature}°C</td>
                                        <td className="text-ctp-text px-6 py-4">{item.humidity}%</td>
                                        <td className="text-ctp-text px-6 py-4">{dateArray[index]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
