import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { emailService } from "../services/email.service";
// import { EmailFolderList } from "../cmps/EmailFolderList";
import { GoTrash } from "react-icons/go";
import { BiArrowBack } from "react-icons/bi";

export function EmailDetails() {
  const params = useParams();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  // const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  useEffect(() => {
    loadEmail();
  }, [params.emailId]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      // Confirmation that isRead us true
      if (email.isRead != true) {
        email.isRead = true;
        await emailService.save(email);
      }
      setEmail(email);
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

  // function onSetFilter(filterBy) {
  //   setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  // }

  // const { status, txt, isRead } = filterBy;
  if (!email) return <div>Loding email...</div>;

  return (
    <section className="email-details">
      <Link to={`/EmailIndex`}>
        <button className="back-btn">
          <BiArrowBack className="icon-btn" />
        </button>
      </Link>
      <button className="trash-btn" onClick={onRemoveEmail}>
        <GoTrash className="icon-btn" />
      </button>
      <section>
        <h1>{email.subject}</h1>
        <p className="email-from">{email.from}</p>
        <p>{email.body}</p>
      </section>
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
