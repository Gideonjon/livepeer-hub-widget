import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Contributors Widget Test Page</h1>
      
      <div className="space-y-8">
        {/* Basic Widget */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Widget</h2>
          <iframe
            src="/widget"
            style={{
              border: 'none',
              width: '100%',
              height: '400px',
              maxWidth: '600px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            title="Livepeer Contributors Spotlight"
          />
        </div>

        {/* Dark Theme Widget */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Dark Theme Widget</h2>
          <iframe
            src="/widget?theme=dark"
            style={{
              border: 'none',
              width: '100%',
              height: '400px',
              maxWidth: '600px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            title="Livepeer Contributors Spotlight - Dark Theme"
          />
        </div>

        {/* Custom Configuration Widget */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Custom Configuration Widget</h2>
          <iframe
            src="/widget?maxDisplay=3&autoRotate=true&rotationInterval=3000&randomize=true&theme=light"
            style={{
              border: 'none',
              width: '100%',
              height: '400px',
              maxWidth: '600px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            title="Livepeer Contributors Spotlight - Custom Config"
          />
        </div>
      </div>
    </div>
  );
}
