import SignupForm from 'src/components/SignupForm';

export default function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-full">
      <div className="col-span-3 flex flex-col items-center justify-center p-3 bg-gray-900 ">
        <h1 className="font-bold text-2xl text-blue-500 tracking-tighter mb-4">
          Chario
        </h1>
        <SignupForm />
      </div>
      <div
        className="col-span-2 relative  chario__sign-right bg-opacity-50"
        style={{ backgroundImage: 'url(/bg2.jpg)' }}
      >
        <div className="max-w-md w-full absolute top-1/2 -left-20 transform -translate-y-1/2 bg-white chario__custom-shadow-blue rounded overflow-hidden ">
          <img
            className="max-w-md w-full "
            src="/guy-on-laptop.svg"
            alt="guy-on-laptop"
          />
        </div>
        <div className="w-28 h-28 absolute top-3/4 -left-40 bg-white chario__custom-shadow-green rounded-full">
          <img className="w-full" src="/saving.svg" alt="saving" />
        </div>
      </div>
    </div>
  );
}
