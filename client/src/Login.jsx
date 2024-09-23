const Login = () => {
  return (
    <div className="register-page-content w-full flex items-center justify-center">
      <div className="form-container max-w-lg mt-14 mb-16 w-full p-8 bg-white rounded-lg shadow-xl">
        <form action="" method="post">
          <div className="form-heading text-4xl font-extrabold mb-6 text-center ">
            Login
          </div>
          <div className="form-element mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-element mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          <div className="button-element">
            <button 
              type="submit" 
              className="w-full my_button bg-red-700 text-white py-3 px-4 rounded-lg font-semibold  transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
