import {useState} from 'react';

const initialFormData = {
    username: "",
    password: "",
}

function LoginForm({login}: {login: LoginFunc}){
    const [formData, setFormData] = useState(initialFormData);

    function handleChange(evt: React.ChangeEvent<InputElements>) {
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value,
        }));
      }

    function handleSubmit(evt: React.FormEvent){
        evt.preventDefault();

        login(formData);
        setFormData(initialFormData);
    }

    return(
        <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null} */}

              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    );
}

export default LoginForm