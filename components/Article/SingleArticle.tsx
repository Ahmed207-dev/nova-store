interface ArticaleData {
  title: string;
  description: string;
  date: string;
  id: number;
}

interface Articale {
  Article: ArticaleData;
}

const SingleArticle = ({ Article }: Articale) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100 flex flex-col justify-center items-center">
      <div className="bg-white/10 p-4 rounded-lg m-4">
        <div className="flex justify-center">
          <div className="w-100 md:w-full m-5 h-40 bg-indigo-400 rounded-lg flex justify-center items-center"></div>
        </div>
        <h1 className="text-xl font-bold my-2">{Article.title}</h1>
        <p className=" md:w-200 text-gray-400 text-sm my-2">
          {Article.description}
        </p>
        <div className="flex justify-end">
          <span>{Article.date}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
