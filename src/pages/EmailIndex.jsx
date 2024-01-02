import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
// import { EmailFilter } from "../cmps/EmailFilter";
import { SearchFilter } from "../cmps/SearchFilter";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { EmailCompose } from "../cmps/EmailCompose";

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [emails, setEmails] = useState(null)
  // const params = useParams();
 const [composeParam, setComposeParam] = useSearchParams();
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
  // const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
  
  const [unreadCount, SetunreadCount] = useState(0)
  const { emailId } = useParams();
  // נסיון להכניס את שם התקייה בקישור בדרך יוז פראם
  //  const folder1 = !folder ? 'inbox' : folder
  //  console.log('folder1', folder1);
  // console.log('params.folder', params.folder)
  // console.log('folder', folder)

  useEffect(() => {
    
    // Sanitize filterBy
    setSearchParams(filterBy)
    loadEmail()
  }, [filterBy, unreadCount])

  async function loadEmail() {
    try {
      const {emails, unreadCount} = await emailService.query(filterBy)
      setEmails(emails)
      SetunreadCount(unreadCount)
    } catch (error) {
      console.log("Faild to load emails: ", error)
    }
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }
  // onSetStarAndRead
  async function onUpdateEmail(newEmail) {
    try{
      await emailService.save(newEmail)

      // const saveEmail = await emailService.save(newEmail)
      // לשנות הסטייט במקום לטעון מחדש
      loadEmail();
      // setEmails((prevEmails) => prevEmails.map(email => email.id === saveEmail.id ? saveEmail : email))
    }catch (error) {
      console.log("Faild to save email", error)
    }

  }


  async function onAddEmail(newEmail) {
    try{
      await emailService.save(newEmail)
       loadEmail()
      // const saveEmail = await emailService.save(newEmail)
      // setEmails((prevEmails) => [...prevEmails, saveEmail])
    }catch (error) {
      console.log("Faild to save email", error)
    }
  }


  async function onRemoveEmail(newEmail) {
    try {
      await emailService.remove(newEmail.id);
      loadEmail();
    } catch (error) {
      console.log("error:", error);
    }
  }


  
  function onOpenCompose(openComposeObj) {
    setComposeParam(openComposeObj)
  }

  if (!emails) return <div>Loading...</div>
  const { status, txt, isRead } = filterBy
  return (
    <section className="EmailIndex">
      <section className="header-EIndex">
        <SearchFilter filterBy={{ txt }} onSetFilter={onSetFilter} />
      </section>
      <section className="aside-EIndex">
        <EmailFolderList filterBy={{ status }} unreadCount={unreadCount} onSetFilter={onSetFilter} onOpenCompose={onOpenCompose} />
      </section>
      <section className="main-EIndex">
      {!emailId && <>
        <EmailFilter filterBy={{ isRead }} onSetFilter={onSetFilter} />
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail} onRemoveEmail={onRemoveEmail}/>
        </>
      }
     {emailId && <Outlet />} 
      </section>
      {composeParam.get('compose') && <EmailCompose onAddEmail={onAddEmail} />}
      
    </section>
  );
}
// <Outlet context={{ onAddEmail }} />EmailDetails
// <Outlet />