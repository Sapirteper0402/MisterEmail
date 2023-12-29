import { useState } from "react";
import { emailService } from "../services/email.service";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";



export function EmailCompose() {

    const [email, setEmail] = useState(emailService.createEmail());
    const { onAddEmail } = useOutletContext();
    const navigate = useNavigate();

    function handleChange({ target }){
        let { name: field, value} = target;
        setEmail((prevEmail) => ({...prevEmail, [field]: value, isRead: true}));
    }
    
    async function onSaveEmail(ev){
        ev.preventDefault();
        try {          
           await onAddEmail(email);
           navigate('/EmailIndex');
        } catch (err) {
            console.log('Had issues saving email', err);
        }
    }

    const { to, subject, body } = email;
  return (
    <section className="email-compose">
      <section className="head-compose">
        <h2>New Message</h2>
        <Link to="/EmailIndex"><button className="close-btn">X</button></Link>
      </section>

      <form onSubmit={onSaveEmail}>
        <label htmlFor="to" hidden>To</label>
        <input className="input-header" placeholder="To" type="text" name="to" id="to" value={to} onChange={handleChange}/>

        <label htmlFor="subject" hidden>Subject</label>
        <input className="input-header" placeholder="subject" type="text" name="subject" id="subject" value={subject} onChange={handleChange}/>

        <label htmlFor="body" hidden>Body</label>
        <textarea className="input-body" type="text" name="body" id="body" value={body} onChange={handleChange}/>

        <button className="send-btn">Send</button>
      </form>
      
    </section>
  );
}

