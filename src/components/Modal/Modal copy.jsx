import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		modalImageURL: PropTypes.shape({
			largeImageURL: PropTypes.string.isRequired,
			tags: PropTypes.string.isRequired,
		}),
	};

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = e => {
		if (e.code === 'Escape') {
			this.props.onClose();
		}
	};

	handleBackdropClick = e => {
		if (e.currentTarget === e.target) {
			this.props.onClose();
		}
	};

	render() {
		return createPortal(
			<div className="Overlay" onClick={this.handleBackdropClick}>
				<div className="Modal">
					<img
						src={this.props.modalImageURL.largeImageURL}
						alt={this.props.modalImageURL.tags}
					/>
				</div>
			</div>,
			modalRoot
		);
	}
}
