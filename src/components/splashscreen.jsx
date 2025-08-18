const SplashScreen = ({isLoading}) => {
    return <div className={`transition-opacity duration-500 ${isLoading?"opacity-100":"opacity-0 pointer-events-none"} relative z-20` }>
        <div className="fixed inset-0 z-10 w-full h-screen bg-zinc-800">
            <div className = "flex h-full items-center justify-center text-center text-white flex flex-col">
                <img src = "assets/shake him.gif" className = "h-20"/>
                <div>Loading...</div>
            </div>

        </div>
    </div>
}

export function chickenLoading(timeout, setIsLoading){
    setTimeout(() => {
        setIsLoading(false)
    }, timeout)
}


export default SplashScreen