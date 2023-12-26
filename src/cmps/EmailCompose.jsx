import { useState } from "react";
import { emailService } from "../services/email.service";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

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
    <Link to="/EmailIndex"><button className="close-btn">X</button></Link>
      <h1>Composey</h1>
      <form onSubmit={onSaveEmail}>
        <label htmlFor="to">To</label>
        <input type="text" name="to" id="to" value={to} onChange={handleChange}></input>

        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" id="subject" value={subject} onChange={handleChange}></input>

        <label htmlFor="body">Body</label>
        <input type="text" name="body" id="body" value={body} onChange={handleChange}></input>

        <button>Send</button>
      </form>
    </section>
  );
}

