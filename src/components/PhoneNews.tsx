import React, { useEffect, useRef, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  author: string;
  content: string;
  image: string;
}

const PhoneNews: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/newsData.json')
      .then(response => response.json())
      .then(data => {
        setNewsItems(data.newsItems);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news');
        setLoading(false);
      });
  }, []);


  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section className="section py-8" id="phone-news">
      <div className="container mx-auto px-4 mt-8 max-w-7xl">
        <div className="h-14 text-center bg-gray-100 py-3">
          <div className="flex items-center justify-center space-x-3">
            <span className="w-3 h-3 bg-black"></span>
            <h1 className="text-xl">Phone News</h1>
          </div>
        </div>

        <div className="news__container -mx-4 px-2 py-2">
          <div
            ref={sliderRef}
            className="overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide -mx-4 py-4"
          >
            <div className="flex gap-8 px-4 py-4">
              {newsItems.map((item: NewsItem) => (
                <div
                  key={item.id}
                  className="flex-none w-[calc(100%-2rem)] sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]"
                >
                  <div className="new__card bg-white rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] transition-shadow duration-300 h-[500px] flex flex-col my-4">
                    <div className="card__header h-48 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="card__footer p-2 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <span className="text-gray-600 text-sm">By {item.author}</span>
                      <p className="mt-4 text-gray-700 line-clamp-3 flex-grow">{item.content}</p>
                      <div className="mt-auto pt-2">
                        <button className="w-full py-3 px-6 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneNews;
