type CalorieDisplayProps = {
    calorias: number
    text: string
}

export default function CaloryDisplay({calorias, text} : CalorieDisplayProps) {
  return (
    <p className=" text-white font-bold rounded-full grid grid-cols-1
    gap-3 text-center">
        <span className=" font-bold text-6xl text-orange"> 
            {calorias}
        </span>
        {text}
    </p>
  )
}
