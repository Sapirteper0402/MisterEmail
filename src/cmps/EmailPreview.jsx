import { useEffect, useState } from "react";

export function EmailPreview({ email, onSetStar }) {
  const truncatedSubject =
    email.subject.length > 20
      ? `${email.subject.substring(0, 20)}...`
      : email.subject;
  const emailPreviewClass = email.isRead ? "email-read" : "email-unread";
  const starPreviewClass = email.isStarred ? "color-star" : "uncolor-star";
  const [emailStarred, setEmailStarred] = useState(email);

  useEffect(() => {
    onSetStar(emailStarred);
  }, [emailStarred]);

  function handleStarClick() {
    setEmailStarred((prevEmail) => ({...prevEmail, isStarred: !email.isStarred,}));
  }

  return (
    <section className={emailPreviewClass}>
      <button className="star-btn" onClick={handleStarClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={starPreviewClass}
          viewBox="0 0 16 16"
        >
          <path d="M8 .687l1.648 3.984h4.177l-3.182 2.593 1.201 4.296-3.844-2.999-3.843 2.999 1.201-4.296L.175 4.67H4.352L6 .687 7.648 4.67H12l-3.845 2.999 1.201 4.296-3.844-2.999-3.843 2.999 1.201-4.296L.175 4.67H4.352L6 .687z" />
        </svg>
      </button>

      <span>{email.from}</span>
      <span>{truncatedSubject}</span>
      <span>תאריך</span>
    </section>
  );
}
