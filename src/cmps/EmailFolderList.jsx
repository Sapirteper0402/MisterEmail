import { useEffect, useState } from "react";

export function EmailFolderList({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function onChooseFolder(val) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, status: val }));
    onSetFilter(filterByToEdit);
  }

  return (
    <section className="EmailFolderList">
    <button className="btn-compose">Compose</button>
    <hr/>
      <div className="buttonListFolder">
      <button onClick={() => onChooseFolder("inbox")}>Inbox</button>
      <button onClick={() => onChooseFolder("star")}>Starred</button>
      <button onClick={() => onChooseFolder("sent")}>Sent</button>
      <button onClick={() => onChooseFolder("draft")}>Draft</button>
      <button onClick={() => onChooseFolder("trash")}>Trash</button>
    </div>


    </section>
  );
}

// EmailFolderList
// aside-EIndex

// <ul className="ulListFolder">
// <li onClick={() => onChooseFolder("inbox")}>Inbox</li>
// <li onClick={() => onChooseFolder("star")}>Starred</li>
// <li onClick={() => onChooseFolder("sent")}>Sent</li>
// <li onClick={() => onChooseFolder("draft")}>Draft</li>
// <li onClick={() => onChooseFolder("trash")}>Trash</li>
// </ul>