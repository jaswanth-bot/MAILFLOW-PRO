import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import Alert from "./Alert";
import LoadingSpinner from "./LoadingSpinner";

const initialForm = {
  to_email: "",
  subject: "",
  message: ""
};

export default function EmailForm({ onEmailSent }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert({ type: "", message: "" });

    if (!form.to_email || !form.subject || !form.message) {
      setAlert({ type: "error", message: "All fields are required." });
      return;
    }

    setLoading(true);
    try {
      const sendEmail = httpsCallable(functions, "sendEmail");
      const result = await sendEmail(form);
      setAlert({ type: "success", message: result.data.message || "Email sent successfully." });
      setForm(initialForm);
      onEmailSent?.();
    } catch (error) {
      setAlert({ type: "error", message: error.message || "Failed to send email." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card h-fit p-5 xl:col-span-2">
      <h2 className="mb-1 text-lg font-semibold text-slate-900">Send Email</h2>
      <p className="mb-4 text-sm text-slate-500">Sent via your platform mailbox (SendGrid + Cloud Function).</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Receiver Email</label>
          <input
            type="email"
            name="to_email"
            value={form.to_email}
            onChange={handleChange}
            className="input-field"
            placeholder="receiver@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="input-field"
            placeholder="Email subject"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="6"
            className="input-field"
            placeholder="Write your message..."
            maxLength={2000}
            required
          />
          <p className="mt-1 text-right text-xs text-slate-500">{form.message.length}/2000</p>
        </div>

        <button type="submit" disabled={loading} className="primary-btn w-full">
          {loading ? (
            <LoadingSpinner text="Sending..." />
          ) : (
            <>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.94 2.94a1.5 1.5 0 011.55-.36l11.8 3.93a1.5 1.5 0 01.08 2.82l-4.8 1.92-1.92 4.8a1.5 1.5 0 01-2.82-.08l-3.93-11.8a1.5 1.5 0 01.04-1.23z" />
              </svg>
              Send Email
            </>
          )}
        </button>
      </form>

      <div className="mt-4">
        <Alert type={alert.type} message={alert.message} />
      </div>
    </section>
  );
}
