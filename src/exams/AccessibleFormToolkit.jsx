import { useRef, useState } from 'react';

// Practical Exam 3: Accessible Form Toolkit (useRef and useState)
function AccessibleFormToolkit() {
  // Render-driven form values live in state.
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [previousEmail, setPreviousEmail] = useState('');
  const [clicks, setClicks] = useState(0);

  // Refs for the three input elements (attached through the ref attribute).
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Previous submitted email: a ref, so changing it does not cause a render.
  const lastEmail = useRef('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email address.';
    if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    setErrors(newErrors);

    // Focus the first invalid field: name, then email, then password.
    // Refs are used in the event handler, never during rendering.
    if (newErrors.name) nameRef.current.focus();
    else if (newErrors.email) emailRef.current.focus();
    else if (newErrors.password) passwordRef.current.focus();

    if (Object.keys(newErrors).length === 0) {
      setPreviousEmail(lastEmail.current); // show the earlier submission
      lastEmail.current = form.email; // then remember this one
    }
  };

  return (
    <div className="card">
      <h1>Practical Exam 3: Accessible Form Toolkit</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            ref={nameRef}
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            ref={emailRef}
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
            value={form.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Register</button>
      </form>

      <p>Previous submitted email: {previousEmail || '(none yet)'}</p>

      <h3>Debugging case</h3>
      {/* Mutating clicks.current would not schedule a render, so the screen
          would not update. Visible data therefore uses state. */}
      <button onClick={() => setClicks((c) => c + 1)}>Clicked {clicks} times</button>
    </div>
  );
}

export default AccessibleFormToolkit;
