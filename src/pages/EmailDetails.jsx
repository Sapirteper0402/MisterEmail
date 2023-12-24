import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";

export function EmailDetails() {
  const params = useParams();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    loadEmail();
  }, [params.emailId]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
    //   if(email.isRead != true) { email.isRead = true}
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function onRemoveEmail() {
    await emailService.remove(email.id);
    // Navigate(`/EmailIndex`);
  }

  if (!email) return <div>Loding email...</div>;
  return (
    <section className="email-details">
        <h1>EmailDetails</h1>
        <p>subject: {email.subject}</p>
        <p>body: {email.body}</p>
        <button onClick={onRemoveEmail}>מחיקה</button>
        <Link to={`/EmailIndex`}>back</Link>
    </section>
  );
}



// <section className="aside-EIndex">
// <EmailFolderList filterBy={{ status }} onSetFilter={onSetFilter} />
// </section>

// <section className="EmailIndex">
// <section className="header-EIndex">
//   <SearchFilter filterBy={{ txt }} onSetFilter={onSetFilter} />
// </section>
// <section className="aside-EIndex">
//   <EmailFolderList filterBy={{ status }} onSetFilter={onSetFilter} />
// </section>
// <section className="main-EIndex">
//   <EmailFilter filterBy={{ isRead }} onSetFilter={onSetFilter} />
//   <EmailList emails={emails} onSetStar={onSetStar}/>
// </section>
// </section>
