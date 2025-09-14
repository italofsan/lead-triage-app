type ErrorTextProps = {
  textError: string
}

export const ErrorText = ({ textError }: ErrorTextProps) => {
  return (
    <div className='text-red-500 mb-2 px-2 py-2 rounded-lg shadow-sm bg-red-50 text-sm sm:text-base break-words w-full max-w-full'>
      {textError}
    </div>
  )
}
