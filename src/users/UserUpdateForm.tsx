import { useState, useContext } from "react";
import JoblyApi from "../helpers/api";
import UserContext from "../auth/UserContext";
import ErrorCard from "../helpers/Error";
import "./ProfileForm.css"

// eslint-disable-next-line

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */
const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
}

function UserUpdateForm() {
  const { currentUser, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initializeForm);
  const [formErrors, setFormErrors] = useState<IErrorAPI[] | null>(null);

  //TSNOTE:
  //This function exists entirely to satisfy Typescript since a user can be null
  //Would a better approach to cast it as a type? Because this route will render
  //is controlled by the Router, we in face do *know better* than TS.
  function initializeForm(){
    if(currentUser){
        return {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            username: currentUser.username,
          }
    }

    return initialFormData;
  }

  console.debug(
    "ProfileForm",
    "currentUser=", currentUser,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    let username = formData.username;
    let updatedUser: IUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
        if(errors instanceof Array){
            setFormErrors(errors);
        }
      return;
    }

    setFormData(f => ({ ...f }));
    setFormErrors(null);

    // trigger reloading of user information throughout the site
    if(setUser){
        setUser((currentUser:IUser) => ({
            ...currentUser,
            data: updatedUser
          }));
    }
  }

  /** Handle form data changing */
  function handleChange(evt: React.ChangeEvent<InputElements>) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  let errorRenders: JSX.Element[] = [];
  if(formErrors){
    errorRenders = formErrors.map((err) => <ErrorCard err={err}/>);
  }

  return (
    <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                disabled
                className="form-control"
                placeholder={formData.username}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {errorRenders}

            {/* {saveConfirmed
              ?
              <Alert type="success" messages={["Updated successfully."]} />
              : null} */}

            <div className="d-grid">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default UserUpdateForm;
