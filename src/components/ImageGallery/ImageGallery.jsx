import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes, { object } from 'prop-types';

export const ImageGallery = ({ images, onImageClick }) => {
	return (
		<div className="Container">
			<ul className="ImageGallery">
				{images.map(({ id, tags, webformatURL, largeImageURL }) => {
					return (
						<ImageGalleryItem
							key={id}
							tags={tags}
							webformatURL={webformatURL}
							largeImageURL={largeImageURL}
							onClick={onImageClick}
						/>
					);
				})}
			</ul>
		</div>
	);
};
ImageGallery.propTypes = {
	images: PropTypes.arrayOf(object).isRequired,
	onImageClick: PropTypes.func.isRequired,
};
