import { useEffect, useState } from "react";

export function EmailFolderList({ filterBy, unreadCount, onSetFilter }) {
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
      <hr />
      <div className="buttonListFolder">
        <button onClick={() => onChooseFolder("inbox")} className={filterByToEdit.status === "inbox" ? "active" : ""}>Inbox<span className="inbox-count">{unreadCount != 0 && unreadCount}</span></button>
        <button onClick={() => onChooseFolder("star")} className={filterByToEdit.status === "star" ? "active" : ""}>Starred</button>
        <button onClick={() => onChooseFolder("sent")} className={filterByToEdit.status === "sent" ? "active" : ""}>Sent</button>
        <button onClick={() => onChooseFolder("draft")} className={filterByToEdit.status === "draft" ? "active" : ""}>Draft</button>
        <button onClick={() => onChooseFolder("trash")} className={filterByToEdit.status === "trash" ? "active" : ""}>Trash</button>
      </div>
    </section>
  );
}
