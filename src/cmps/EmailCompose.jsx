import { useState } from "react";
import { emailService } from "../services/email.service";
import { Link, useNavigate } from "react-router-dom";
// import { IoCloseOutline } from "react-icons/io5";



export function EmailCompose({ onAddEmail }) {

    const [email, setEmail] = useState(emailService.createEmail());
    const navigate = useNavigate();
    const [isMinimized, setIsMinimized] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false);
    // const formClass = isMinimized? "minimize-message" : "unminimize-message"
    const formClass = isMinimized? "minimize-message" : "unminimize-message"
    const composeClass = isFullScreen?  "email-compose-full-screen" : "email-compose"
    function handleChange({ target }){
        let { name: field, value} = target;
        setEmail((prevEmail) => ({...prevEmail, [field]: value, isRead: true}));
    }

    async function onSaveEmail(ev){
        ev.preventDefault();
        try {          
           await onAddEmail(email);
           navigate('/mail');
        } catch (err) {
            console.log('Had issues saving email', err);
        }
    }

// function onFullAndMinimize(view ,ev) {
//   ev.stopPropagation();
//   if (view === "Minimize") {
//     setIsMinimized((prevIsMinimized) => !prevIsMinimized)
//     setIsFullScreen(false)
//   } 
//   else {
//     setIsFullScreen((previsFullScreen) => !previsFullScreen)
//     setIsMinimized(false)
//   }
// }

    function onMinimize(ev){
      ev.stopPropagation();
      setIsMinimized((prevIsMinimized) => !prevIsMinimized)
      setIsFullScreen(false)
    }

    function onFullScreen(ev){
      ev.stopPropagation();
      setIsFullScreen((previsFullScreen) => !previsFullScreen)
      setIsMinimized(false)
    }

    const { to, subject, body } = email;
  return (
    <section className={composeClass}>
      <section className="head-compose" onClick={onMinimize}>
        <h2>New Message</h2>
        <Link to="/mail"><button className="close-btn">X</button></Link>
        <button onClick={onFullScreen} className="close-btn">+</button>
        <button onClick={onMinimize} className="close-btn">-</button>
      </section>

      <form onSubmit={onSaveEmail} className={formClass}>
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

