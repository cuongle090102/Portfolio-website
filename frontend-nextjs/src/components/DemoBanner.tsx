'use client'

export default function DemoBanner() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) return null;
  
  return (
    <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm">
      <span className="font-medium">📦 Demo Mode:</span> This is a static demo hosted on GitHub Pages. 
      <span className="ml-2">Admin login: <code className="bg-blue-500 px-1 rounded">demo123</code></span>
    </div>
  );
}