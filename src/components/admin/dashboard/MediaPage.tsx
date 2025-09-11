'use client';

import MediaLibrary, { MediaFile } from '../MediaLibrary';

const MediaPage = () => {
    const handleSelect = (media: MediaFile) => {
        console.log('Selected media:', media);
    };

    return (
        <div className="flex flex-col">
            <div className="border-b">
                <h1 className="text-2xl font-bold text-gray-900">Media</h1>
            </div>
            <div className="flex-1 overflow-hidden">
                <MediaLibrary
                    isOpen={true}
                    onClose={() => {}}
                    onSelect={handleSelect}
                    isEmbedded={true}
                />
            </div>
        </div>
    );
};

export default MediaPage;
