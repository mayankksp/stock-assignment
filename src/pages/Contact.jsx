import React from "react";
import "../contact.scss";
const Contact = () => {
  return (
    <div className="contact">
      <main>
        <h1>Contact Us</h1>
        <form>
          <div>
            <label>First Name</label>
            <input type="text" required placeholder="abc" />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" required placeholder="abc" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" required placeholder="abc@xyz.com" />
          </div>
          <div>
            <label>Message</label>
            <input
              type="text"
              required
              placeholder="Tell us about your query"
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
