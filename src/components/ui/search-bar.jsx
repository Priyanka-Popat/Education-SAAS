import SearchIcon from '/assets/icons/search-icon.svg'
const SearchBar = () => {
    return (
      <>
        <div className="relative w-full h-full flex justify-start items-center">
          <input type="search" name="" id="" placeholder='Search' className='bg-[#FFFFFF0F] py-2 rounded-full w-[95%] placeholder-[#B2B2B2] placeholder:font-urbanistRegular xl:ps-10 ps-2 placeholder:text-sm text-white' />
          <img src={SearchIcon} alt="" className='w-5 absolute top-[40%] left-3' />
        </div>
      </>
    )
}

export default SearchBar