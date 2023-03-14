export const ErrorMessage = ({ searchQuery }) => {
	return (
		<h2 className="ErrorMessage">{`No images by query ${searchQuery}`}</h2>
	);
};
