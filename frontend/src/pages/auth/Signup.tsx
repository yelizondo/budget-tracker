import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { AuthContextDTO, SpinnerContextDTO, UserDTO } from "../../library/DTOs";
import { useAuthContext, useSpinnerContext } from "../../contexts";

export function Signup(): JSX.Element {
    const [error, setError] = useState<string>("");
    const [newUser, setNewUser] = 
      useState<{Name: string, Email: string, Password: string, RepeatedPassword: string}>
      ({ Name: "", Email: "", Password: "", RepeatedPassword: "" });
    const context  = useAuthContext();
    const spinnerContext = useSpinnerContext();

    if (!context) {
        return <div>Loading</div>
    }
    
    const { signup } = context as AuthContextDTO;
    const { setShowSpinner } = spinnerContext as SpinnerContextDTO;

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        setError("");
        event.preventDefault();
        if (newUser.Email !== '' && newUser.Password !== '' && newUser.Name !== '' && newUser.RepeatedPassword !== '') {
          if (newUser.Password === newUser.RepeatedPassword) {
            setShowSpinner(true);

            const user: UserDTO = {
              Name: newUser.Name,
              Email: newUser.Email,
              Password: newUser.Password,
            };

            signup(user)
            .catch(err => {
                if (err?.response?.status === 400 || err?.response?.status > 500) {
                    setShowSpinner(false);
                    setError(err?.response?.data?.message);
                } else if (err?.response?.status === 401) {
                    setShowSpinner(false);
                    setError(err?.response?.data?.message);
                } else {
                    setShowSpinner(false);
                    setError('Unexpected error');
                }
            });
          } else {
            setError('Passwords are not equal');
          }
        } else {
            setError('Fields are invalid');
        }
    }

  return (
    <section className="h-screen">
      <div className={`container h-full px-6 py-24`}>
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="/savings-piggie.svg"
              className="w-full"
              alt="Savings piggie"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="w-full g:ml-6 lg:w-5/12">
            <form onSubmit={(e) => submitHandler(e)}>

              {/* <!-- Name input --> */}
              <TEInput
                type="text"
                label="Name"
                size="lg"
                className="mb-6"
                onChange={
                    (e) => setNewUser({ ...newUser, Name: e.target.value })
                }
              ></TEInput>

              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                onChange={
                    (e) => setNewUser({ ...newUser, Email: e.target.value })
                }
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                onChange={
                    (e) => setNewUser({ ...newUser, Password: e.target.value })
                }
              ></TEInput>

              <TEInput
                type="password"
                label="Repeat password"
                className="mb-6"
                size="lg"
                onChange={
                    (e) => setNewUser({ ...newUser, RepeatedPassword: e.target.value })
                }
              ></TEInput>

              {/* Error message */}
              <div className="mb-3 mt-0">
                  <p className="text-red-600">{error !== '' ? error : ''}</p>
              </div>

              {/* <!-- Submit button --> */}
              <TERipple rippleColor="light" className="w-full">
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Create Account
                </button>
              </TERipple>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}