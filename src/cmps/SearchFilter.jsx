import { useEffect, useState } from "react";


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
        <form>
            <input className="search-input" onChange={handleChange} id="txt" value={txt} name="txt" type="text" placeholder="Search"/>
        </form>
  );
}