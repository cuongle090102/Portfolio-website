'use client'

interface Block {
  id: string;
  type: 'text' | 'heading' | 'subheading' | 'image' | 'video' | 'gallery';
  content: string;
  metadata?: any;
  images?: string[]; // For gallery type - array of image URLs
}

interface BlockRendererProps {
  blocks: Block[];
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

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return <div className="text-gray-500 italic">No content available</div>;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            return (
              <h1 key={block.id} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {block.content}
              </h1>
            );
          
          case 'subheading':
            return (
              <h2 key={block.id} className="text-xl font-bold text-gray-800 mt-6 mb-3">
                {block.content}
              </h2>
            );
          
          case 'text':
            return (
              <div key={block.id} className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {block.content}
                </p>
              </div>
            );
          
          case 'image':
            // Support both single image (content) and multiple images (images array)
            const imageUrls = block.images && block.images.length > 0 ? block.images : (block.content ? [block.content] : []);
            
            return (
              <div key={block.id} className="my-8">
                {imageUrls.length > 0 ? (
                  imageUrls.length === 1 ? (
                    // Single image
                    <div className="w-full flex justify-center rounded-lg overflow-hidden">
                      <img
                        src={imageUrls[0]}
                        alt="Project image"
                        className="h-auto object-contain max-h-[70vh] max-w-full rounded-lg"
                        style={{ 
                          minHeight: '200px',
                          backgroundColor: 'transparent'
                        }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.log('Image failed to load:', imageUrls[0]);
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `
                              <div class="flex flex-col items-center justify-center h-48 text-gray-500 bg-white border border-gray-200 rounded-lg">
                                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span class="text-sm">Image not available</span>
                                <span class="text-xs text-gray-400 mt-1">Check console for details</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    // Multiple images - Gallery layout
                    <div className="w-full">
                      <div className={`grid gap-4 ${
                        imageUrls.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                        imageUrls.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 
                        imageUrls.length === 4 ? 'grid-cols-2 md:grid-cols-2' :
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`}>
                        {imageUrls.map((imageUrl, index) => (
                          <div key={index} className="rounded-lg overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={`Project image ${index + 1}`}
                              className="w-full h-auto object-contain max-h-[50vh] rounded-lg"
                              style={{ 
                                minHeight: '150px',
                                backgroundColor: 'transparent'
                              }}
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                console.log('Image failed to load:', imageUrl);
                                target.style.display = 'none';
                                if (target.parentElement) {
                                  target.parentElement.innerHTML = `
                                    <div class="flex flex-col items-center justify-center h-32 text-gray-500 bg-white border border-gray-200 rounded-lg">
                                      <svg class="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                      <span class="text-xs">Image ${index + 1} not available</span>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                    <span>No images provided</span>
                  </div>
                )}
              </div>
            );
          
          case 'gallery':
            // Dedicated gallery block type
            const galleryImages = block.images || (block.content ? block.content.split(',').map(url => url.trim()) : []);
            
            return (
              <div key={block.id} className="my-8">
                {galleryImages.length > 0 ? (
                  <div className="w-full">
                    <div className={`grid gap-4 ${
                      galleryImages.length === 1 ? 'grid-cols-1' :
                      galleryImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                      galleryImages.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 
                      galleryImages.length === 4 ? 'grid-cols-2 md:grid-cols-2' :
                      galleryImages.length <= 6 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                      'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    }`}>
                      {galleryImages.map((imageUrl, index) => (
                        <div key={index} className="rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                          <img
                            src={imageUrl}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-auto object-contain max-h-[40vh] rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                            style={{ 
                              minHeight: '120px',
                              backgroundColor: 'transparent'
                            }}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              console.log('Gallery image failed to load:', imageUrl);
                              target.style.display = 'none';
                              if (target.parentElement) {
                                target.parentElement.innerHTML = `
                                  <div class="flex flex-col items-center justify-center h-32 text-gray-500 bg-white border border-gray-200 rounded-lg">
                                    <svg class="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span class="text-xs">Image ${index + 1} not available</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                    <span>No gallery images provided</span>
                  </div>
                )}
              </div>
            );

          case 'video':
            return (
              <div key={block.id} className="my-8">
                {block.content ? (
                  <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                    {block.content.includes('youtube.com') || block.content.includes('youtu.be') || block.content.includes('vimeo.com') ? (
                      <iframe
                        src={getEmbedUrl(block.content)}
                        title="Video content"
                        className="w-full h-64 md:h-96 lg:h-[500px]"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-auto max-h-[70vh]"
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `
                              <div class="flex flex-col items-center justify-center h-48 text-gray-500">
                                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                                <span class="text-sm">Video not available</span>
                              </div>
                            `;
                          }
                        }}
                      >
                        <source src={block.content} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center text-gray-500">
                    <span>Video not provided</span>
                  </div>
                )}
              </div>
            );
          
          default:
            return null;
        }
      })}
    </div>
  );
}