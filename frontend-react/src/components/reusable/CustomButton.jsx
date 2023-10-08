export function CustomButton({bgColor, textColor, size, name, font}) {
  return (
    <button className={`${bgColor} ${textColor} ${size} ${font} py-2 text-center leading-tight text-xl md:text-base mx-auto mt-10 mb-4 border rounded-xl`}>{name}</button>
  )
}

