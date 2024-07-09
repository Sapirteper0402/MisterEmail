import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export function SearchFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev){
        const val = ev.target.value;
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: val }))
    }

 const { txt } = filterByToEdit;
    return (
        <form className="search-form">
            <label htmlFor="txt" hidden>Search email</label>
            <div className="search-container">
                <IoSearchOutline className="search-icon" />
                <input className="search-input" onChange={handleChange} id="txt" value={txt} name="txt" type="text" placeholder="Search mail" />
            </div>
        </form>
  );
}

