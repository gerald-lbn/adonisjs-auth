import { useForm } from '@inertiajs/react'

export default function RegisterScreen() {
  const form = useForm({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/register')
  }

  const onFormFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof typeof form.data
  ) => {
    form.setData(name, e.target.value)
  }

  return (
    <div>
      <h1>Register</h1>

      <pre>
        <code>{JSON.stringify(form, null, 2)}</code>
      </pre>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            required
            type="text"
            id="fullName"
            value={form.data.fullName}
            onChange={(e) => onFormFieldChange(e, 'fullName')}
          />
          {form.errors.fullName && <p>{form.errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input required type="email" id="email" onChange={(e) => onFormFieldChange(e, 'email')} />
          {form.errors.email && <p>{form.errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            onChange={(e) => onFormFieldChange(e, 'password')}
          />
          {form.errors.password && <p>{form.errors.password}</p>}
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            required
            type="password"
            id="passwordConfirmation"
            onChange={(e) => onFormFieldChange(e, 'passwordConfirmation')}
          />
          {form.errors.passwordConfirmation && <p>{form.errors.passwordConfirmation}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
