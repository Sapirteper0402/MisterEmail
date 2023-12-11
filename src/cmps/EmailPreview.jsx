export function EmailPreview({ email }) {
  
    const truncatedSubject = email.subject.length > 20 ? `${email.subject.substring(0, 20)}...` : email.subject;
    // const emailPreviewClass = `Email-Preview ${email.isRead ? 'opened' : ''}`;
    const emailPreviewClass = email.isRead ? 'Email-Open' : 'Email-notOpen';

    return (
    <section className={emailPreviewClass}>
      <span>אייקון</span>
      <span>{email.from}</span>
      <span>{truncatedSubject}</span>
      <span>תאריך</span>
    </section>
  );
}