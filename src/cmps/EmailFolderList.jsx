import { useEffect, useState } from "react";

export function EmailFolderList({ filterBy, onSetFilter }) {
  
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
      onSetFilter(filterByToEdit)
  }, [filterByToEdit])

function onChooseFolder(val){
  console.log("status", val);
  setFilterByToEdit(prevFilter => ({ ...prevFilter, status: val }));
  console.log("filterByToEdit", filterByToEdit);
  onSetFilter(filterByToEdit);
}

    return (
      <ul >
        <li onClick={() => onChooseFolder("inbox")}>Inbox</li>
        <li onClick={() => onChooseFolder("star")}>Starred</li>
        <li onClick={() => onChooseFolder("sent")}>Sent</li>
        <li onClick={() => onChooseFolder("draft")}>Draft</li>
        <li onClick={() => onChooseFolder("trash")}>Trash</li>
      </ul>
  );
}