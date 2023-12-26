import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
// import { EmailFilter } from "../cmps/EmailFilter";
import { SearchFilter } from "../cmps/SearchFilter";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { Outlet } from "react-router-dom";
// import { EmailLists } from "../cmps/EmailLists";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const [unreadCount, SetunreadCount] = useState(0);

  useEffect(() => {
    loadEmail();
  }, [filterBy, unreadCount]);

  async function loadEmail() {
    try {
      const {emails, unreadCount} = await emailService.query(filterBy);

      setEmails(emails);
      SetunreadCount(unreadCount);
    } catch (error) {
      console.log("Faild to load emails: ", error);
    }
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }
  // onSetStarAndRead
  async function onUpdateEmail(newEmail) {
    try{
      const saveEmail = await emailService.save(newEmail);
      // לשנות הסטייט במקום לטעון מחדש
      // loadEmail();
      setEmails((prevEmails) => prevEmails.map(email => email.id === saveEmail.id ? saveEmail : email));
    }catch (error) {
      console.log("Faild to save email", error);
    }

  }


  async function onAddEmail(newEmail) {
    try{
      await emailService.save(newEmail);
       loadEmail();
      // const saveEmail = await emailService.save(newEmail);
      // setEmails((prevEmails) => [...prevEmails, saveEmail]);
    }catch (error) {
      console.log("Faild to save email", error); 
    }
  }

  if (!emails) return <div>Loading...</div>;
  const { status, txt, isRead } = filterBy;
  return (
    <section className="EmailIndex">
      <section className="header-EIndex">
        <SearchFilter filterBy={{ txt }} onSetFilter={onSetFilter} />
      </section>
      <section className="aside-EIndex">
        <EmailFolderList filterBy={{ status }} unreadCount={unreadCount} onSetFilter={onSetFilter} />
      </section>
      <section className="main-EIndex">
        <EmailFilter filterBy={{ isRead }} onSetFilter={onSetFilter} />
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail} />
      </section>

      <Outlet context={{ onAddEmail }} />
    </section>
  );
}
