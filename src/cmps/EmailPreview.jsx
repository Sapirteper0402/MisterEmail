import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { BsStarFill } from "react-icons/bs";

export function EmailPreview({ email, onSetStarAndRead }) {

  const truncatedSubject =
    email.subject.length > 20
      ? `${email.subject.substring(0, 20)}...`
      : email.subject;
  const emailPreviewClass = email.isRead ? "email-read" : "email-unread";
  const starPreviewClass = email.isStarred ? "color-star" : "uncolor-star";
  const [emailStarredAndRead, setEmailStarredAndRead] = useState(email);
  // const [emailUnRead, setemailUnRead] = useState(email);

  useEffect(() => {
    onSetStarAndRead(emailStarredAndRead);
  }, [emailStarredAndRead]);

  function handleStarClick(ev) {
    if (ev) ev.preventDefault();

    setEmailStarredAndRead((prevEmail) => ({
      ...prevEmail,
      isStarred: !email.isStarred,
    }));
  }

  function handleReadClick(ev) {
    if (ev) ev.stopPropagation();
    if(email.isRead != true){
      setEmailStarredAndRead((prevEmail) => ({
        ...prevEmail,
        isRead: true,
      }));
    }
  }
 
  // const sentAtDate = new Date(email.sentAt);
  // const sentAtFormatted = sentAtDate.toLocaleString('en-US', {
  //   // year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });


  // לזכור!! 
  // onClick={handleReadClick} לא עובד


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


// <article className={emailPreviewClass} onClick={() => handleReadClick(ev)}></article>
