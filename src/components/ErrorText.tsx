type ErrorTextProps = {
  textError: string
}

export const ErrorText = ({ textError }: ErrorTextProps) => {
  return <div className='text-red-500 mb-2'>{textError}</div>
}
