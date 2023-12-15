import { useEffect, useState } from "react";

export function EmailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleSelectChange(ev){
        const val = ev.target.value;
        const isReadValue = val === 'true' ? true : val === 'false' ? false : undefined;
        setFilterByToEdit(prevFilter => ({ ...prevFilter, isRead: isReadValue }));
    }


    const { isRead } = filterByToEdit;
    return (
        <form>
            <label htmlFor="isRead" style={{ display: "none" }}>Filter by Read Status:</label>
            <select id="isRead" name="isRead" value={isRead} onChange={handleSelectChange} className="filter-select">
                <option value="undefined">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
        </form>
  );
}
