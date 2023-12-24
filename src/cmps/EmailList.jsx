import { EmailPreview } from "./EmailPreview";


export function EmailList({ emails, onSetStar }) {


    return (
    <ul className="email-list">
      {emails.map((email) => (
        <li key={email.id}>
        <EmailPreview email={email} onSetStar={onSetStar}/>
        </li>
      ))}
    </ul>
  );
}
