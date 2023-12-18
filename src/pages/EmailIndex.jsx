import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
// import { EmailFilter } from "../cmps/EmailFilter";
import { SearchFilter } from "../cmps/SearchFilter";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailFolderList } from "../cmps/EmailFolderList";
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

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  if (!emails) return <div>Loading...</div>;
  const { status, txt, isRead } = filterBy;
  return (
    <section className="EmailIndex">
      <section className="header-EIndex">
        <SearchFilter filterBy={{ txt }} onSetFilter={onSetFilter} />
      </section>
      <section className="aside-EIndex">
        <EmailFolderList filterBy={{ status }} onSetFilter={onSetFilter} />
      </section>
      <section className="main-EIndex">
        <EmailFilter filterBy={{ isRead }} onSetFilter={onSetFilter} />
        <EmailList emails={emails} />
      </section>
    </section>
  );
}
