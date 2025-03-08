import { useState } from 'react';

function ImageUpload({ images, setImages, handleImageUpload }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <section>
            <label>
                Imagens do Produto:
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                />
            </label>
            <div className="imagePreview">
                {images.length > 0 && (
                    <>
                        <img src={images[currentImageIndex]} alt={`Imagem ${currentImageIndex + 1}`} className="previewImage" />
                        {images.length > 1 && (
                            <div className="image-navigation">
                                <button type="button" onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}>
                                    ←
                                </button>
                                <button type="button" onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}>
                                    →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default ImageUpload;  