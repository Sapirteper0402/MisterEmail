import { useEffect, useState } from "react";

export function EmailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    useEffect(() => {
        onSetFilter(filterByToEdit)
        console.log(filterByToEdit);
    }, [filterByToEdit])


    function handleSelectChange(ev){
        const val = ev.target.value;
        console.log('val1', val);
        const isReadValue = val === "true";
        setFilterByToEdit(prevFilter => ({ ...prevFilter, isRead: isReadValue }));
        console.log('vafilterByToEditl', filterByToEdit);
    }


    const { isRead } = filterByToEdit;
    return (
        <form>
            <label htmlFor="isRead" style={{ display: "none" }}>Filter by Read Status:</label>
            <select id="isRead" name="isRead" value={isRead} onChange={handleSelectChange} className="filter-select">
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
        </form>
  );
}
