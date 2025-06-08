const GlassBox = ({children ,className = ""}) => {
    return (
        <>
        <div className={` ${className} bg-black/20 backdrop-blur-md rounded-[24px]`}>
        {children}
        </div>
        </>
    )
}


export default GlassBox

