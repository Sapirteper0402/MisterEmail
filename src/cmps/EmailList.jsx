import { EmailPreview } from "./EmailPreview";


export function EmailList({ emails, onSetStarAndRead }) {


    return (
    <ul className="email-list">
      {emails.map((email) => (
        <li key={email.id}>
        <EmailPreview email={email} onSetStarAndRead={onSetStarAndRead}/>
        </li>
      ))}
    </ul>
  );
}
