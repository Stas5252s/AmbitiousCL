import { motion } from "framer-motion";
import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("https://formspree.io/f/mwvwergd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back nav */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 backdrop-blur-xl bg-background/80 border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          to="/"
          className="text-foreground font-bold text-lg tracking-tight flex items-center gap-3 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          AMBITIOUS
        </Link>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-xl">
          <motion.p
            className="font-mono-label mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            005 — Contact
          </motion.p>

          <motion.h1
            className="text-headline text-foreground text-4xl md:text-6xl mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Get in touch.
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Have a question, proposal, or just want to say hello? Drop us a line.
          </motion.p>

          {submitted ? (
            <motion.div
              className="border border-border p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Send className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-headline text-foreground text-xl mb-2">Message sent.</h3>
              <p className="text-muted-foreground text-sm">
                We'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <label className="font-mono-label block mb-3">Your email</label>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={255}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="font-mono-label block mb-3">Your name</label>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  placeholder="John Doe"
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="font-mono-label block mb-3">Message</label>
                <textarea
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="font-mono-label px-10 py-4 border border-foreground text-foreground btn-fill-hover transition-colors duration-500 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
