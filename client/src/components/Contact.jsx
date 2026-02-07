import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

// ──────────────────────────────────────────────────────
// FORMSPREE SETUP (free, no backend needed):
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form and copy your form ID
// 3. Replace 'YOUR_FORM_ID' below with your actual ID
//    e.g. 'xpzvqkdl'
// ──────────────────────────────────────────────────────
const FORMSPREE_ID = 'YOUR_FORM_ID';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;
const FORMSPREE_CONFIGURED = FORMSPREE_ID !== 'YOUR_FORM_ID';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    // If Formspree isn't configured, fall back to mailto
    if (!FORMSPREE_CONFIGURED) {
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.open(`mailto:connorhenderson20@gmail.com?subject=${subject}&body=${body}`);
      setStatus('success');
      setStatusMessage('>>> Email client opened. Send the message from there!');
      return;
    }

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setStatusMessage('>>> Message sent successfully. I will be in touch!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        const errorMsg = data.errors
          ? data.errors.map((err) => err.message).join(', ')
          : 'Something went wrong.';
        setStatusMessage(`>>> ERROR: ${errorMsg}`);
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('>>> ERROR: Network error. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Contact</h2>
            <div className="terminal-line">
              <span className="prompt">$</span> ./send_message.sh
            </div>
          </div>
        </ScrollReveal>

        <div className="contact__wrapper">
          <ScrollReveal delay={100} direction="left">
            <div className="contact__info">
              <div className="contact__ascii">
                ┌{'─'.repeat(36)}┐{'\n'}
                │{'  TRANSMISSION INTERFACE'.padEnd(36)}│{'\n'}
                │{'  Ready to receive input...'.padEnd(36)}│{'\n'}
                └{'─'.repeat(36)}┘
              </div>
              <p className="contact__text">
                Have a question, opportunity, or just want to say hello?
                Fill out the form and I'll get back to you as soon as possible.
              </p>
              <div className="contact__direct">
                <div className="contact__direct-item">
                  <span className="prompt">&gt;</span> phone: <a href="tel:+15082779898">(508) 277-9898</a>
                </div>
                <div className="contact__direct-item">
                  <span className="prompt">&gt;</span> email: <a href="mailto:connorhenderson20@gmail.com">connorhenderson20@gmail.com</a>
                </div>
                <div className="contact__direct-item">
                  <span className="prompt">&gt;</span> github: <a href="https://github.com/Connohendo" target="_blank" rel="noopener noreferrer">github.com/Connohendo</a>
                </div>
                <div className="contact__direct-item">
                  <span className="prompt">&gt;</span> linkedin: <a href="https://linkedin.com/in/connor-henderson" target="_blank" rel="noopener noreferrer">linkedin.com/in/connor-henderson</a>
                </div>
                <div className="contact__direct-item">
                  <span className="prompt">&gt;</span> portfolio: <a href="https://connohendo.github.io" target="_blank" rel="noopener noreferrer">connohendo.github.io</a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250} direction="right">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">
                  <span className="prompt">&gt;</span> name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact__input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="enter your name..."
                  required
                  autoComplete="name"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="email" className="contact__label">
                  <span className="prompt">&gt;</span> email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact__input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="enter your email..."
                  required
                  autoComplete="email"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="message" className="contact__label">
                  <span className="prompt">&gt;</span> message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact__input contact__textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="type your message here..."
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                className="contact__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '[ TRANSMITTING... ]' : '[ SEND_MESSAGE ]'}
              </button>

              {statusMessage && (
                <div className={`contact__status contact__status--${status}`}>
                  {statusMessage}
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
