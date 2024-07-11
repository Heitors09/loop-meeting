'use client'
import {useState, useEffect} from 'react'

const DateTime = () => {
   const[time,setTime] = useState('')
   const[date,setDate] = useState('')

   useEffect(()=>{
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('pt-BR',{
        hour: '2-digit',
        minute: '2-digit'
      }))
      setDate(new Intl.DateTimeFormat('pt-BR',{dateStyle:'full'}).format(now))
    }

    updateTime()


    const intervalId = setInterval(updateTime,60000)


    return () => clearInterval(intervalId)
   },[])


  return (
    <div className="h-[300px] w-full rounded-[10px] bg-hero bg-cover">
        <div className=" flex h-full flex-col justify-end max-md:px-5 max-md:py-8 lg:p-11">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-[#acacac] lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
  )
}

export default DateTime
