import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
	tags,
	webformatURL,
	largeImageURL,
	onClick,
}) => {
	return (
		<li className="ImageGalleryItem">
			<img
				className="ImageGalleryItem-image"
				src={webformatURL}
				alt={tags}
				onClick={() => onClick(largeImageURL, tags)}
			/>
		</li>
	);
};

ImageGalleryItem.propTypes = {
	tags: PropTypes.string.isRequired,
	webformatURL: PropTypes.string.isRequired,
	largeImageURL: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
