import { useState, memo, useCallback, useMemo } from "react";
import { createContact } from "../lib/api-contact.js";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('bp1FhOMEoyawU1owx');

const Contact = memo(() => {
  const [form, setForm] = useState({ 
    fullName: "", 
    email: "", 
    message: "",
    phone: "",
    subject: ""
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    setStatus("");
    setError("");
  }, []);

  const validateForm = useCallback(() => {
    if (!form.fullName || !form.email || !form.message) {
      setError("Name, Email, and Message are required fields.");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    
    if (form.message.length < 10) {
      setError("Message must be at least 10 characters long.");
      return false;
    }
    
    return true;
  }, [form.fullName, form.email, form.message]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setStatus("Sending...");
    setError("");
    
    try {
      // Save to database first
      const res = await createContact(form);
      if (res.error) {
        setError(res.error);
        setStatus("");
        return;
      }
      
      // Send email using EmailJS (no server-side email config needed)
      try {
        console.log('Attempting to send email via EmailJS...');
        const emailResult = await emailjs.send(
          'service_q4vu9ch', // Your Service ID is now configured
          'template_3yiy5pg', // Your Template ID is now configured
          {
            from_name: form.fullName,
            from_email: form.email,
            phone: form.phone || '',
            subject: form.subject || 'Portfolio Contact Message',
            message: form.message,
            to_name: 'Joshua Desroches',
            to_email: 'josh.des.21@gmail.com',
            // Additional common template variables
            user_name: form.fullName,
            user_email: form.email,
            user_phone: form.phone || '',
            user_subject: form.subject || 'Portfolio Contact Message',
            user_message: form.message
          },
          'bp1FhOMEoyawU1owx' // Your public key is now configured
        );
        
        console.log('EmailJS response:', emailResult);
        setStatus("Message sent successfully! Thank you for contacting me.");
        console.log('Email sent successfully via EmailJS');
      } catch (emailError) {
        console.error('EmailJS error details:', emailError);
        console.error('Error message:', emailError.message);
        console.error('Error text:', emailError.text);
        setStatus("Message saved successfully! (Email notification may have failed)");
      }
      
      setForm({ 
        fullName: "", 
        email: "", 
        message: "",
        phone: "",
        subject: ""
      });
      
    } catch (error) {
      setError("Network error. Please try again.");
      setStatus("");
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      {/* Contact page */}
      <h1>Contact</h1>
      <div className="DualPanelContainer"> {/* Essentially a two column layout page */}
          <div className="LeftPanel"> {/* The left panel with picture of me and buttons to resume and ways to contact me */}
              <img src="/res/Pic of me.jpg" className="SelfImg" alt="Picture of Joshua D" />
              {/* Email Address */}
              <button onClick={() => window.open("mailto:josh.des.21@gmail.com")}>
                  <img src="https://images.icon-icons.com/2642/PNG/512/google_mail_gmail_logo_icon_159346.png" alt="Gmail email icon - contact via email" />
                  Email Address
              </button>

              {/* Phone Number */}
              <button onClick={() => window.open("tel:+6473559303")}>
                  <img src="https://cdn-icons-png.flaticon.com/512/4367/4367049.png" alt="Phone icon - contact by phone" />
                  Phone Number
              </button>

              {/* LinkedIn */}
              <button onClick={() => window.open("https://www.linkedin.com/in/joshua-desroches/")}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/500px-LinkedIn_logo_initials.png" alt="LinkedIn logo - professional networking profile" />
                  Linkedin Profile
              </button>
              

              {/* Github */}
              <button onClick={() => window.open("https://github.com/TheGuy3201")}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png" alt="GitHub logo - code repositories and projects" />
                  Github Profile
              </button>
              
          </div>

          {/* The right panel with a form to enter name, email, and message */}
          <div className="ContactPanel">
              <h2>Contact Me</h2>
              <form onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={form.fullName} 
                    onChange={handleChange} 
                    placeholder="Enter your full name" 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email" 
                    required 
                  />
                  <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="Enter your phone number (optional)" 
                  />
                  <input 
                    type="text" 
                    name="subject" 
                    value={form.subject} 
                    onChange={handleChange} 
                    placeholder="Enter subject (optional)" 
                  />
                  <textarea 
                    name="message" 
                    value={form.message} 
                    onChange={handleChange} 
                    className="Message" 
                    placeholder="Enter your message (minimum 10 characters)" 
                    required
                    minLength="10"
                  ></textarea>
                  <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                  {status && <div style={{ color: "green", marginTop: "10px" }}>{status}</div>}
                  {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
              </form>
          </div>
      </div>
    </>
  );
});

Contact.displayName = 'Contact';
export default Contact;