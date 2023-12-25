import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router"
import { emailService } from "../services/email.service";
// import { EmailFolderList } from "../cmps/EmailFolderList";

export function EmailDetails() {
  const params = useParams();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

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
    try {
      await emailService.remove(email.id);
      console.log(email.id);
      navigate(`/EmailIndex`);
    } catch (error) {
      console.log("error:", error);
    }

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
