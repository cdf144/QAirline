const NewsSection: React.FC = () => {
  return (
    <div className="mt-[60px] h-10 w-full max-w-[1000px] p-4 bg-gray-100 text-black text-lg text-left flex items-center rounded-lg shadow bg-[url('/src/assets/News_bg.png')] bg-cover bg-center">
      <img src="/src/assets/docuicon.png" alt="News icon" className="h-5 w-5" />
      <span className="font-semibold ml-2">News:</span>
      <span className="ml-2">
        Discover the latest travel updates and promotions!
      </span>
    </div>
  );
};

export default NewsSection;
