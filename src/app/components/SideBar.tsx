import React from 'react';
import Link from 'next/link';
import UploadModal from './UploadModal';

const SideBar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-4">Explore Options</h2>

      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/category/music" className="hover:text-gray-400">
              Music
            </Link>
          </li>
          <li>
            <Link href="/category/podcasts" className="hover:text-gray-400">
              Podcasts
            </Link>
          </li>
          <li>
            <Link href="/category/stories" className="hover:text-gray-400">
              Stories
            </Link>
          </li>
          <li>
            <Link href="/category/interviews" className="hover:text-gray-400">
              Interviews
            </Link>
          </li>
        </ul>
      </div>

      {/* Recent Uploads Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/recent/1" className="hover:text-gray-400">
              Latest Note 1
            </Link>
          </li>
          <li>
            <Link href="/recent/2" className="hover:text-gray-400">
              Latest Note 2
            </Link>
          </li>
          <li>
            <Link href="/recent/3" className="hover:text-gray-400">
              Latest Note 3
            </Link>
          </li>
        </ul>
      </div>

      {/* Popular Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Popular Voice Notes</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/popular/1" className="hover:text-gray-400">
              Popular Note 1
            </Link>
          </li>
          <li>
            <Link href="/popular/2" className="hover:text-gray-400">
              Popular Note 2
            </Link>
          </li>
          <li>
           <UploadModal />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
