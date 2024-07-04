const Loading = ({fullscreen = true}) => {
  if (fullscreen) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        Loading...
      </div>
    )
  }
  return (
    <div className="w-full h-full flex-1 flex justify-center items-center bg-gray-100">
      Loading...
    </div>
  )
}

export default Loading
