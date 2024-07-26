import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { AuthContextDTO, SpinnerContextDTO, UserDTO } from "../../library/DTOs";
import { useAuthContext, useSpinnerContext } from "../../contexts";

export function Login(): JSX.Element {
    const [error, setError] = useState<string>("");
    const [loginUser, setLoginUser] = useState<UserDTO>({ Email: "", Password: ""});
    const context  = useAuthContext();
    const spinnerContext = useSpinnerContext();

    if (!context) {
        return <div>Loading</div>
    }
    
    const { login } = context as AuthContextDTO;
    const { setShowSpinner } = spinnerContext as SpinnerContextDTO;

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        setError("");
        event.preventDefault();
        if (loginUser.Email !== '' && loginUser.Password !== '') {
            setShowSpinner(true);
            login(loginUser)
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
            setError('Valores inválidos');
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
              alt="Phone image"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="w-full g:ml-6 lg:w-5/12">
            <form onSubmit={(e) => submitHandler(e)}>
              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                onChange={
                    (e) => setLoginUser({ ...loginUser, Email: e.target.value })
                }
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                onChange={
                    (e) => setLoginUser({ ...loginUser, Password: e.target.value })
                }
              ></TEInput>

              {/* Error message */}
            <div className="mb-3 mt-0">
                <p className="text-red-600">{error !== '' ? error : ''}</p>
            </div>

              {/* <!-- Remember me checkbox --> */}
              {/* <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="exampleCheck3"
                    defaultChecked
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div> */}

                {/* <!-- Forgot password link --> 
                <a
                  href="#!"
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >
                  Forgot password?
                </a> */}
              {/* </div> */}

              {/* <!-- Submit button --> */}

              <TERipple rippleColor="light" className="w-full">
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Ingresar
                </button>
              </TERipple>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}