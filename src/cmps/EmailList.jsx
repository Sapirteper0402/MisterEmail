import { EmailPreview } from "./EmailPreview";


export function EmailList({ emails, onUpdateEmail, onRemoveEmail }) {


    return (
    <ul className="email-list">
      {emails.map((email) => (
        <li key={email.id}>
        <EmailPreview email={email} onUpdateEmail={onUpdateEmail} onRemoveEmail={onRemoveEmail} />
        </li>
      ))}
    </ul>
  );
}
