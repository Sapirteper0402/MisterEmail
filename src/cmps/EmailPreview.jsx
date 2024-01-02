import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { BsStarFill } from "react-icons/bs";
import { GoTrash } from "react-icons/go";

export function EmailPreview({ email, onUpdateEmail, onRemoveEmail }) {
  const truncatedSubject =
    email.subject.length > 20
      ? `${email.subject.substring(0, 20)}...`
      : email.subject
  const emailPreviewClass = email.isRead ? "email-read" : "email-unread"
  const starPreviewClass = email.isStarred ? "color-star" : "uncolor-star"
  // const [emailStarred, setEmailStarred] = useState(email)
  const [updateEmail, setupdateEmail] = useState(email)
  // const [emailUnRead, setemailUnRead] = useState(email)

  useEffect(() => {
    onUpdateEmail(updateEmail)
  }, [updateEmail])

  function handleStarClick(ev) {
    if (ev) ev.preventDefault()
    setupdateEmail((prevEmail) => ({
      ...prevEmail,
      isStarred: !email.isStarred,
    }))
  }

  function handleRemoveClick(ev) {
    if (ev) ev.preventDefault()
    if (updateEmail.removedAt != null) {
      onRemoveEmail(updateEmail)
    }else{
      setupdateEmail((prevEmail) => ({
        ...prevEmail,
        removedAt: Date.now(),
      }))
    }
    
  }

  return (
    <section className="email-preview">
      <Link to={`/mail/:folder/${email.id}`}>
        <article className={emailPreviewClass}>
          <BsStarFill className={starPreviewClass} onClick={(ev) => handleStarClick(ev)} />
          <span className="email-from">{email.from}</span>
          <span className="email-subject">{truncatedSubject}</span>
          <span className="email-date">{utilService.formatSentAt(email.sentAt)}</span>
          <button className="delete-btn" onClick={(ev) => handleRemoveClick(ev)}>
            <GoTrash />
          </button>
        </article>
      </Link>
    </section>
  );
}
