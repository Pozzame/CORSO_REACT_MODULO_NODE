import {useState} from 'react';

export default function LoginForm({onLogin, erroreLogin}) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');

  function gestisciSubmit(e) {
    e.preventDefault();
    console.log('submit intercettata');
    onLogin(username, password);
  }

  return (
    <div>
      <form onSubmit={gestisciSubmit}>
        <input type="text" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {erroreLogin && <p className="errore">{erroreLogin}</p>}
    </div>
  );
}
