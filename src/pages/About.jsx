import { useState } from "react";
import "./About.css";

const tiers = [
  {
    badge: "Starter",
    badgeClass: "",
    title: "Beginner",
    desc: "Build your foundation with structured routines, proper form coaching, and flexible nutrition guidance for lifelong results.",
    features: [
      "Beginner-friendly workout plans",
      "Form & technique coaching",
      "Nutrition & meal planning basics",
      "Progress tracking tools",
    ],
  },
  {
    badge: "Level Up",
    badgeClass: "tier-badge--mid",
    title: "Experienced",
    desc: "Break plateaus with progressive overload programs, advanced techniques, and data-driven insights to push your limits.",
    features: [
      "Advanced strength programs",
      "Endurance & HIIT protocols",
      "Body composition analytics",
      "Weekly performance reviews",
    ],
  },
  {
    badge: "Elite",
    badgeClass: "tier-badge--pro",
    title: "Professional",
    desc: "Compete at the highest level with competition prep, periodization strategy, and elite athlete coaching support.",
    features: [
      "Contest prep programs",
      "Bulking & cutting cycles",
      "Periodization blueprints",
      "1-on-1 coach access",
    ],
  },
];

const contactMethods = [
  { icon: "📧", title: "Email Us",  val: "support@loraxgains.com" },
  { icon: "💬", title: "Live Chat", val: "Available Mon – Sat, 7 AM – 9 PM" },
  { icon: "📍", title: "Studio",    val: "123 Iron Ave, Fitness City, FC 54321" },
];

const stats = [
  ["12K+", "Active Members"],
  ["350+", "Workout Programs"],
  ["97%",  "Satisfaction Rate"],
  ["24/7", "Support"],
];

const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function TierCard({ tier }) {
  return (
    <div className="tier-card">
      <span className={`tier-badge ${tier.badgeClass}`}>{tier.badge}</span>
      <div className="tier-title">{tier.title}</div>
      <p className="tier-desc">{tier.desc}</p>
      <ul className="tier-features">
        {tier.features.map((f) => (
          <li key={f} className="tier-feature-item">
            <span className="feature-dot" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  const [form, setForm]               = useState({ name: "", email: "", category: "", message: "" });
  const [rating, setRating]           = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted]     = useState(false);
  const [errors, setErrors]           = useState({});

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", category: "", message: "" });
    setRating(0);
    setErrors({});
  };

  return (
    <div className="about-root">

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="hero-accent" />
        <p className="eyebrow">Since 2020 · Trusted by Athletes Worldwide</p>
        <h1 className="hero-title">
          About
          <span className="hero-title-accent">Lorax Gains</span>
        </h1>
        <p className="hero-sub">
          Your ultimate fitness partner — built for beginners chasing their first PR,
          experienced athletes breaking plateaus, and professionals competing at the
          highest level.
        </p>
        <div className="stats-row">
          {stats.map(([num, label]) => (
            <div key={label} className="stat">
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRAINING TIERS ── */}
      <section className="about-section">
        <div className="section-title">
          Training Programs
          <div className="section-line" />
        </div>
        <div className="tiers">
          {tiers.map((t) => <TierCard key={t.title} tier={t} />)}
        </div>
      </section>

      <hr className="about-divider" />

      {/* ── CONTACT / FEEDBACK ── */}
      <section className="contact-section">
        <div className="section-title">
          Customer Service
          <div className="section-line" />
        </div>

        <div className="contact-grid">

          {/* Left — contact info */}
          <div className="contact-info">
            <div>
              <h2 className="contact-title">
                We're<br />
                <span className="contact-title-accent">Here</span><br />
                For You
              </h2>
              <p className="contact-subtitle">
                Questions, feedback, or coaching inquiries — our team responds within
                24 hours. Your progress is our priority.
              </p>
            </div>
            <div className="contact-method">
              {contactMethods.map((c) => (
                <div key={c.title} className="contact-item">
                  <span className="contact-icon">{c.icon}</span>
                  <div>
                    <div className="contact-item-title">{c.title}</div>
                    <div className="contact-item-val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — feedback form */}
          <div>
            {submitted ? (
              <div className="success-box">
                <div className="success-icon">✅</div>
                <div className="success-title">Message Received!</div>
                <p className="success-sub">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                  Keep grinding — we've got your back.
                </p>
                <button className="reset-btn" onClick={handleReset}>
                  Send Another
                </button>
              </div>
            ) : (
              <div className="about-form">

                {/* Name + Email row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      className={`form-input${errors.name ? " form-input--error" : ""}`}
                      name="name"
                      value={form.name}
                      placeholder="John Doe"
                      onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className={`form-input${errors.email ? " form-input--error" : ""}`}
                      name="email"
                      type="email"
                      value={form.email}
                      placeholder="john@email.com"
                      onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a topic…</option>
                    <option value="general">General Inquiry</option>
                    <option value="training">Training Program Help</option>
                    <option value="nutrition">Nutrition & Diet</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="bug">Report an Issue</option>
                  </select>
                </div>

                {/* Star Rating */}
                <div className="form-group">
                  <label className="form-label">Rate Your Experience</label>
                  <div className="rating-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`star-btn${star <= (hoverRating || rating) ? " star-btn--active" : ""}`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      >
                        ★
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="rating-label">{ratingLabels[rating]}</span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">Your Message</label>
                  <textarea
                    className={`form-textarea${errors.message ? " form-textarea--error" : ""}`}
                    name="message"
                    value={form.message}
                    placeholder="Tell us how we can help you…"
                    onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                  Send Message →
                </button>

              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}