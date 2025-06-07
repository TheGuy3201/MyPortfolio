export default function Contact() {

    // Logic to handle the right side of the contact page
    // This is where the user can enter their name, email, and message to send to me

    const handleClick = () => {
    // Get the values from the input fields & store them in variables
    const fullName = document.getElementById('FullName').value;
    const email = document.getElementById('Email').value;
    const message = document.getElementById('Message').value;

    //Future: send values to email to send to me
    alert('You entered: ' + fullName + ', ' + email + ', ' + message);
  };
    return (
    <>
        {/* Contact page */}
        <h1>Contact</h1>
        <div className="DualPanelContainer"> {/* Essentially a two column layout page */}
            <div className="LeftPanel"> {/* The left panel with picture of me and buttons to resume and ways to contact me */}
                <img src="/res/Pic of me.jpg" className="SelfImg" alt="Picture of Joshua D" />
                {/* Email Address */}
                <button onClick={() => window.open("mailto:josh.des.21@gmail.com")}>
                    <img src="https://images.icon-icons.com/2642/PNG/512/google_mail_gmail_logo_icon_159346.png" alt="Gmail logo" />
                    Email Address
                </button>

                {/* Phone Number */}
                <button onClick={() => window.open("tel:+6473559303")}>
                    <img src="https://cdn-icons-png.flaticon.com/512/4367/4367049.png" alt="Phone logo" />
                    Phone Number
                </button>

                {/* LinkedIn */}
                <button onClick={() => window.open("https://www.linkedin.com/in/joshua-desroches/")}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/500px-LinkedIn_logo_initials.png" alt="LinkedIn logo" />
                    Linkedin Profile
                </button>
                

                {/* Github */}
                <button onClick={() => window.open("https://github.com/TheGuy3201")}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png" alt="Github logo" />
                    Github Profile
                </button>
                
            </div>

            {/* The right panel with a form to enter name, email, and message */}
            <div className="ContactPanel">
                <h2>Contact Me</h2>
                <input type="text" id="FullName" placeholder="Enter your full name" />
                <input type="text" id="Email" placeholder="Enter your email" />
                <input type="text" id="Message" className="Message" placeholder="Enter your message" />

                <button onClick={handleClick}>Send Message</button>
            </div>
        </div>
    </>
    );
}