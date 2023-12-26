import { useEffect, useState } from "react";

import { BsStar } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { IoDocumentOutline } from "react-icons/io5";
import { HiOutlineInbox } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";

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
      <Link to="/EmailIndex/add">
        <button className="btn-compose"><GoPencil className="icon-list"/> Compose</button>
      </Link>
      <hr />
      <div className="buttonListFolder">
        <button onClick={() => onChooseFolder("inbox")} className={filterByToEdit.status === "inbox" ? "active" : ""}><HiOutlineInbox className="icon-list"/> Inbox<span className="inbox-count">{unreadCount != 0 && unreadCount}</span></button>
        <button onClick={() => onChooseFolder("star")} className={filterByToEdit.status === "star" ? "active" : ""}><BsStar className="icon-list" /> Starred</button>
        <button onClick={() => onChooseFolder("sent")} className={filterByToEdit.status === "sent" ? "active" : ""}><AiOutlineSend className="icon-list" /> Sent</button>
        <button onClick={() => onChooseFolder("draft")} className={filterByToEdit.status === "draft" ? "active" : ""}><IoDocumentOutline className="icon-list" /> Draft</button>
        <button onClick={() => onChooseFolder("trash")} className={filterByToEdit.status === "trash" ? "active" : ""}><GoTrash className="icon-list" /> Trash</button>
      </div>
    </section>
  );
}




