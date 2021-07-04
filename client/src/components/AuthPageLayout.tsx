interface Props {
  children: React.ReactNode;
}

export default function AuthPageLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-full">
      <div className="col-span-3 flex flex-col items-center justify-center p-3  ">
        <h1 className="font-bold text-2xl text-blue-500 tracking-tighter">
          Chario
        </h1>
        <h2 className="font-medium text-sm text-blue-500 tracking-tighter mb-4">
          Banking with your peers
        </h2>
        {children}
      </div>
      <div
        className="col-span-2 relative  chario__sign-right bg-opacity-100"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
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
