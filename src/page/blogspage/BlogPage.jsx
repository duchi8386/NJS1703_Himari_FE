import { Link } from 'react-router-dom';
import blog1 from '../../assets/img/Image1.png';
import blog2 from '../../assets/img/Image2.png';
import blog3 from '../../assets/img/Image3.png';
import blog4 from '../../assets/img/Groups.png';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      image: blog1,
      category: 'SKIN CONCERNS',
      title: 'Distinguishing Mineral Sunscreens from Chemical Sunscreens',
      link: '/blog/mineral-vs-chemical-sunscreens'
    },
    {
      id: 2,
      image: blog2,
      category: 'SKIN CONCERNS',
      title: 'The Right Skincare When Traveling',
      link: '/blog/skincare-when-traveling'
    },
    {
      id: 3,
      image: blog3,
      category: 'KNOWLEDGE TREASURES',
      title: 'Top 10 Sunscreens in 2024',
      link: '/blog/top-sunscreens-2024'
    },
    {
      id: 4,
      image: blog4,
      category: 'KNOWLEDGE TREASURES',
      title: 'Mastering The Art Of Well Aging',
      link: '/blog/well-aging-guide'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Blog Header */}
      <div className=" text-center py-16 bg-[#fae3e3]">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
      </div>


      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="group">
              <Link to={post.link} className="block">
                <div className="h-[300px] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="group">
              <Link to={post.link} className="block h-full">
                <div className="flex flex-col h-full">
                  <div className="space-y-2 flex-grow">
                    <p className="text-xs text-[#666666] uppercase tracking-wider">
                      {post.category}
                    </p>
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <span className="text-sm text-gray-900">Read More</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;