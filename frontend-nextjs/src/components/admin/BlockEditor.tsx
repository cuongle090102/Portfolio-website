'use client'

import { useState } from 'react';
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface Block {
  id: string;
  type: 'text' | 'heading' | 'subheading' | 'image' | 'video';
  content: string;
  metadata?: any;
}

interface BlockEditorProps {
  initialBlocks: Block[];
  onChange: (blocks: Block[]) => void;
}

const getEmbedUrl = (url: string): string => {
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

export default function BlockEditor({ initialBlocks, onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(
    initialBlocks.length > 0 ? initialBlocks : [{ id: '1', type: 'text', content: '' }]
  );

  const updateBlocks = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  const addBlock = (afterIndex: number, type: Block['type']) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: ''
    };
    const newBlocks = [...blocks];
    newBlocks.splice(afterIndex + 1, 0, newBlock);
    updateBlocks(newBlocks);
  };

  const removeBlock = (index: number) => {
    if (blocks.length === 1) return; // Keep at least one block
    const newBlocks = blocks.filter((_, i) => i !== index);
    updateBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    updateBlocks(newBlocks);
  };

  const updateBlock = (index: number, content: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = content;
    updateBlocks(newBlocks);
  };

  const renderBlock = (block: Block, index: number) => {
    const isFirstBlock = index === 0;
    const isLastBlock = index === blocks.length - 1;

    return (
      <div key={block.id} className="group relative border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
        {/* Block Controls */}
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          {!isFirstBlock && (
            <button
              type="button"
              onClick={() => moveBlock(index, 'up')}
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
              title="Move up"
            >
              <ArrowUpIcon className="w-3 h-3" />
            </button>
          )}
          {!isLastBlock && (
            <button
              type="button"
              onClick={() => moveBlock(index, 'down')}
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
              title="Move down"
            >
              <ArrowDownIcon className="w-3 h-3" />
            </button>
          )}
          {blocks.length > 1 && (
            <button
              type="button"
              onClick={() => removeBlock(index)}
              className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
              title="Delete block"
            >
              <TrashIcon className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Block Type Indicator */}
        <div className="text-xs text-gray-500 mb-2 capitalize">{block.type}</div>

        {/* Block Content */}
        {block.type === 'text' && (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(index, e.target.value)}
            placeholder="Write your content here..."
            className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        )}

        {block.type === 'heading' && (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(index, e.target.value)}
            placeholder="Heading..."
            className="w-full p-3 text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {block.type === 'subheading' && (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(index, e.target.value)}
            placeholder="Subheading..."
            className="w-full p-3 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {block.type === 'image' && (
          <div>
            <input
              type="url"
              value={block.content}
              onChange={(e) => updateBlock(index, e.target.value)}
              placeholder="Image URL..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            {block.content && (
              <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={block.content}
                  alt="Block image"
                  className="w-full max-h-96 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="flex flex-col items-center justify-center h-48 text-gray-500">
                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-sm">Image not available</span>
                      </div>
                    `;
                  }}
                />
              </div>
            )}
          </div>
        )}

        {block.type === 'video' && (
          <div>
            <input
              type="url"
              value={block.content}
              onChange={(e) => updateBlock(index, e.target.value)}
              placeholder="Video URL (YouTube, Vimeo, or direct video file)..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            {block.content && (
              <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
                {block.content.includes('youtube.com') || block.content.includes('youtu.be') || block.content.includes('vimeo.com') ? (
                  <iframe
                    src={getEmbedUrl(block.content)}
                    title="Video"
                    className="w-full h-64 md:h-96"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    controls
                    className="w-full max-h-96"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-48 text-gray-500">
                          <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sm">Video not available</span>
                        </div>
                      `;
                    }}
                  >
                    <source src={block.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Block Menu */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => addBlock(index, 'text')}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
            >
              <PlusIcon className="w-3 h-3" />
              Text
            </button>
            <button
              type="button"
              onClick={() => addBlock(index, 'heading')}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded"
            >
              <PlusIcon className="w-3 h-3" />
              Heading
            </button>
            <button
              type="button"
              onClick={() => addBlock(index, 'subheading')}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded"
            >
              <PlusIcon className="w-3 h-3" />
              Subheading
            </button>
            <button
              type="button"
              onClick={() => addBlock(index, 'image')}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded"
            >
              <PlusIcon className="w-3 h-3" />
              Image
            </button>
            <button
              type="button"
              onClick={() => addBlock(index, 'video')}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded"
            >
              <PlusIcon className="w-3 h-3" />
              Video
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Project Content (Block Editor)
      </div>
      <div className="space-y-4">
        {blocks.map((block, index) => renderBlock(block, index))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Hover over blocks to see controls. Click the + buttons to add new content blocks anywhere.
      </p>
    </div>
  );
}