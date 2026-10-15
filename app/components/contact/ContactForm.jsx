'use client';
import { useState } from 'react';
function QuantumInput({ label, name, type = 'text', required, maxLength, autoComplete }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '0.35rem',
          fontFamily: 'var(--font-rajdhani)',
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: focused ? 'var(--primary)' : 'var(--text-muted)',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'rgba(13,17,23,0.85)',
          border: '1px solid',
          borderColor: focused ? 'var(--primary)' : 'var(--border)',
          borderRadius: '6px',
          padding: '0.65rem 0.875rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-space)',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: focused ? '0 0 18px rgba(37,99,235,0.18)' : 'none',
        }}
      />
      {/* Bottom scan sweep on focus */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          background: 'linear-gradient(to right, var(--primary), var(--accent))',
          width: focused ? '100%' : '0%',
          transition: 'width 0.35s ease',
          borderRadius: '0 0 6px 6px',
        }}
      />
    </div>
  );
}

function QuantumTextarea({ label, name, rows = 5, required, maxLength }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '0.35rem',
          fontFamily: 'var(--font-rajdhani)',
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: focused ? 'var(--primary)' : 'var(--text-muted)',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'rgba(13,17,23,0.85)',
          border: '1px solid',
          borderColor: focused ? 'var(--primary)' : 'var(--border)',
          borderRadius: '6px',
          padding: '0.65rem 0.875rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-space)',
          fontSize: '0.9rem',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: focused ? '0 0 18px rgba(37,99,235,0.18)' : 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          background: 'linear-gradient(to right, var(--primary), var(--accent))',
          width: focused ? '100%' : '0%',
          transition: 'width 0.35s ease',
          borderRadius: '0 0 6px 6px',
        }}
      />
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/sendEmail', { method: 'POST', body: new FormData(e.target) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');
      setStatus('success');
      e.target.reset();
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <QuantumInput label="Your Name"      name="name"    required maxLength={100} autoComplete="name" />
      <QuantumInput label="Email Address"  name="email"   type="email" required maxLength={254} autoComplete="email" />
      <QuantumTextarea label="Message"     name="message" required maxLength={5000} />

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        style={{
          width: '100%',
          padding: '0.9rem',
          fontFamily: 'var(--font-orbitron)',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          background: status === 'success'
            ? 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(21,128,61,0.2))'
            : 'linear-gradient(135deg, rgba(37,99,235,0.22), rgba(124,58,237,0.22))',
          border: '1px solid',
          borderColor: status === 'success' ? 'rgba(34,197,94,0.5)' : 'rgba(37,99,235,0.45)',
          color: 'var(--text-primary)',
          borderRadius: '6px',
          cursor: status === 'sending' || status === 'success' ? 'default' : 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 0 0 transparent',
        }}
        onMouseEnter={(e) => {
          if (status === 'idle' || status === 'error') {
            e.currentTarget.style.boxShadow = '0 0 22px var(--glow-blue)';
            e.currentTarget.style.transform = 'scale(1.015)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          if (status === 'idle' || status === 'error') {
            e.currentTarget.style.transform = 'scale(0.985)';
          }
        }}
        onMouseUp={(e) => {
          if (status === 'idle' || status === 'error') {
            e.currentTarget.style.transform = 'scale(1.015)';
          }
        }}
      >
        {status === 'idle'    && 'SEND MESSAGE'}
        {status === 'sending' && (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span style={{ width: 14, height: 14, border: '2px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
            TRANSMITTING...
          </span>
        )}
        {status === 'success' && '✓ MESSAGE SENT'}
        {status === 'error'   && 'RETRY — SEND AGAIN'}
      </button>

      {status === 'error' && (
        <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#f87171', fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.1em' }}>
          {errorMsg || 'TRANSMISSION FAILED — please try again'}
        </p>
      )}
    </form>
  );
}
