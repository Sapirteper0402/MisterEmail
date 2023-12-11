import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
// import { EmailFilter } from "../cmps/EmailFilter";
import { SearchFilter } from "../cmps/SearchFilter";
// import { EmailLists } from "../cmps/EmailLists";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  useEffect(() => {
    loadEmail();
  }, [filterBy]);

  async function loadEmail() {
    const emails = await emailService.query(filterBy);
    setEmails(emails);
  }

  function onSetFilter(filterBy){
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy}));
  }

  if (!emails) return <div>Loading...</div>;
const { txt, isRead } = filterBy;
  return (
    <section className="EmailIndex">
      <SearchFilter filterBy={{txt}} onSetFilter={onSetFilter}/>
      <EmailList emails={emails}/>
    </section>
  );
}
