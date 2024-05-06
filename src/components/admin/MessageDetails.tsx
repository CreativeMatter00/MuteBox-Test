const MessageDetails = () => {
  return (
    <div className="container">
      <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        Air Jordan 4 Retro Reimagined
      </p>

      <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
        <span>24 april 2024 </span>
        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
          4:34 pm
        </span>
      </button>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
        The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
        February 17, 2024. Your best opportunity to get these right now is by
        entering raffles and waiting for the official releases.
      </p>
    </div>
  );
};

export default MessageDetails;
