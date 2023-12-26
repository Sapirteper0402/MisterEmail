import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { BsStarFill } from "react-icons/bs";

export function EmailPreview({ email, onUpdateEmail }) {

  const truncatedSubject =
    email.subject.length > 20
      ? `${email.subject.substring(0, 20)}...`
      : email.subject;
  const emailPreviewClass = email.isRead ? "email-read" : "email-unread";
  const starPreviewClass = email.isStarred ? "color-star" : "uncolor-star";
  const [emailStarred, setEmailStarred] = useState(email);
  // const [emailUnRead, setemailUnRead] = useState(email);

  useEffect(() => {
    onUpdateEmail(emailStarred);
  }, [emailStarred]);

  function handleStarClick(ev) {
    if (ev) ev.preventDefault();
    setEmailStarred((prevEmail) => ({
      ...prevEmail,
      isStarred: !email.isStarred,
    }));
  }


  return (
    <Link to={`/EmailIndex/${email.id}`} >
    <article className={emailPreviewClass}>
        <BsStarFill className={starPreviewClass} onClick={(ev) => handleStarClick(ev)}/>
        <span className="email-from">{email.from}</span>
        <span className="email-subject">{truncatedSubject}</span>
        <span className="email-date">{utilService.formatSentAt(email.sentAt)}</span>
    </article>
    </Link>
  );
}

