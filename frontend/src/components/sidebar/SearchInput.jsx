import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import useConversation from "../../zustand/useConversation"
import useGetConversations from "../../hooks/useGetConversations"
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [ search, setSearch ] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search){
      toast.error("Search cannot be empty");
      return
    }
    toast.error("This functionality is yet to be implemented");
  }

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input type="text" placeholder='Search...' className='input input-bordered rounded-full' 
              value = {search}
              onChange={ (e) => setSearch(e.target.value) }
            />
            <button type="submit" className='btn btn-circle bg-sky-500 text-white' >
                <CiSearch className='w-6 h-6 outline-none'/>
            </button>
        </form>
    </div>
  )
}

export default SearchInput