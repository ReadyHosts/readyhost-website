import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjwbzke";

const USER_TYPE_LABELS = {
  host: "Airbnb Host",
  cleaner: "Cleaner Applicant",
  pm: "Property Manager",
  hotel: "Hotel",
  general: "General Inquiry",
};

const USER_TYPE_OPTIONS = [
  { value: "host", label: "I'm an Airbnb host" },
  { value: "pm", label: "I'm a property manager" },
  { value: "hotel", label: "I'm with a hotel" },
  { value: "cleaner", label: "I want to join your team" },
  { value: "general", label: "Something else" },
];

export default function ContactForm({ defaultUserType = "general", title = "Tell us about your properties" }) {
  const [searchParams] = useSearchParams();
  const initialUserType = searchParams.get("type") || defaultUserType;

  const [form, setForm] = useState({
    userType: initialUserType,
    name: "",
    email: "",
    phone: "",
    properties: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Update userType if URL param changes (e.g. nav between pages)
  useEffect(() => {
    const t = searchParams.get("type");
    if (t) setForm((f) => ({ ...f, userType: t }));
  }, [searchParams]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("userType", USER_TYPE_LABELS[form.userType] || form.userType);
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("phone", form.phone);
    payload.append("properties", form.properties);
    payload.append("message", form.message);
    payload.append(
      "_subject",
      `New ReadyHost inquiry (${USER_TYPE_LABELS[form.userType]}) — ${form.name || "Web form"}`
    );
    if (form.email) payload.append("_replyto", form.email);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSent(true);
        setForm({
          userType: form.userType,
          name: "",
          email: "",
          phone: "",
          properties: "",
          message: "",
        });
      } else {
        setSubmitError(
          data?.errors?.[0]?.message ||
            `We couldn't send that (status ${response.status}). Try again or email hello@readyhosts.co.`
        );
      }
    } catch (err) {
      setSubmitError(
        "Network error. Please try again or email hello@readyhosts.co directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white text-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-9 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1B6C72]/15 to-[#1B6C72]/5 mx-auto flex items-center justify-center">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#1B6C72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl sm:text-3xl font-bold">Inquiry received.</h3>
        <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">
          We&apos;ll be back to you within 24 hours. For urgent same-day requests, email hello@readyhosts.co with URGENT in the subject.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex items-center justify-center min-h-[44px] px-4 text-sm font-semibold text-[#1B6C72] hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-9 space-y-4"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>

      <div>
        <label htmlFor="userType" className="block text-sm font-semibold text-gray-700 mb-1.5">
          I&apos;m reaching out as
          <span className="text-[#FF6B35]"> *</span>
        </label>
        <select
          id="userType"
          name="userType"
          value={form.userType}
          onChange={handleChange}
          required
          className="w-full px-3.5 py-3 min-h-[44px] text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none transition bg-white"
        >
          {USER_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <Field label="Your name" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" inputMode="email" />
        <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" inputMode="tel" />
      </div>
      <Field
        label={form.userType === "cleaner" ? "Years of cleaning experience" : "How many properties?"}
        name="properties"
        value={form.properties}
        onChange={handleChange}
        placeholder={form.userType === "cleaner" ? "e.g. 2 years" : "e.g. 3 listings in Hollywood Beach"}
      />

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={
            form.userType === "cleaner"
              ? "Tell us about your experience and availability."
              : form.userType === "hotel"
              ? "Property name, room count, current cleaning setup."
              : form.userType === "pm"
              ? "Number of properties, current cleaning workflow."
              : "Same-day turnover, recurring cleans, deep clean, etc."
          }
          className="w-full px-3.5 py-3 text-base min-h-[120px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none transition"
        />
      </div>

      {submitError && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start justify-between gap-3">
          <span>{submitError}</span>
          <button
            type="button"
            onClick={() => setSubmitError("")}
            className="font-semibold text-red-800 hover:underline whitespace-nowrap min-h-[44px] flex items-center"
          >
            Retry
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center px-5 py-3 min-h-[48px] rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed motion-safe:transition-all shadow-md hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <svg className="motion-safe:animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z" />
            </svg>
            {"Sending\u2026"}
          </>
        ) : (
          "Send Inquiry"
        )}
      </button>
      <p className="text-xs text-gray-500 text-center">
        By submitting you agree to be contacted by ReadyHost about your inquiry. Submissions are processed by Formspree.
      </p>
    </form>
  );
}

function Field({ label, name, value, onChange, type = "text", required, placeholder, autoComplete, inputMode }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-[#FF6B35]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full px-3.5 py-3 min-h-[44px] text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none transition"
      />
    </div>
  );
}
