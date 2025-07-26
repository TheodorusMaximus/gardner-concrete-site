import React from 'react';
import { RicosViewer, quickStartViewerPlugins } from '@wix/ricos';
import '@wix/ricos/css/all-plugins-viewer.css';

interface RichContentViewerProps {
  content: any;
}

const plugins = quickStartViewerPlugins();

export const RichContentViewer: React.FC<RichContentViewerProps> = ({ content }) => {
  if (!content) {
    return <div>No content available</div>;
  }

  return (
    <div className="rich-content-viewer prose prose-lg max-w-none">
      <RicosViewer content={content} plugins={plugins} />
    </div>
  );
};

export default RichContentViewer; 