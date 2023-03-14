import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './FetchAPI/FetchAPI';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ErrorMessage } from './ErrorMessage/ErrorMessage.jsx';

class App extends Component {
	state = {
		searchQuery: '',
		images: [],
		page: 1,
		error: null,
		showLoader: false,
		showModal: false,
		showBtn: false,
		modalImageURL: null,
		showErrorMessage: false,
	};

	componentDidUpdate(prevProps, prevState) {
		const prevSearchQuery = prevState.searchQuery;
		const nextSearchQuery = this.state.searchQuery;

		const prevPage = prevState.page;
		const nextPage = this.state.page;

		if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
			this.getImages(nextSearchQuery, this.state.page);
		}
	}

	getImages(searchQuery, page) {
		this.setState({ showLoader: true, showErrorMessage: false });
		fetchImages(searchQuery, page)
			.then(searchData => {
				if (searchData.totalHits === 0) {
					this.setState({ showErrorMessage: true });
				}
				if (this.state.page < Math.ceil(searchData.totalHits) / 12) {
					this.setState({ showBtn: true });
				} else {
					this.setState({ showBtn: false });
				}
				const mapped = searchData.hits.map(
					({ id, webformatURL, largeImageURL, tags }) => ({
						id,
						webformatURL,
						largeImageURL,
						tags,
					})
				);
				this.setState(prevState => ({
					images: [...prevState.images, mapped].flat(),
				}));
			})
			.catch(error => this.setState({ error }))
			.finally(() => {
				this.setState({
					showLoader: false,
				});
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'smooth',
				});
			});
	}

	handleFormSubmit = searchQuery => {
		this.setState({
			searchQuery: searchQuery,
			images: [],
			page: 1,
			showErrorMessage: false,
		});
	};

	loadMore = () => {
		this.setState(prevState => ({
			page: prevState.page + 1,
		}));
	};

	onImageClick = (largeImageURL, tags) => {
		this.setState({
			modalImageURL: { largeImageURL: largeImageURL, tags: tags },
		});
		this.toggleModal();
	};

	toggleModal = () => {
		this.setState(({ showModal }) => ({
			showModal: !showModal,
		}));
	};

	render() {
		const { images, showModal, showLoader, showErrorMessage, showBtn } =
			this.state;

		return (
			<>
				<Searchbar onSubmit={this.handleFormSubmit} />

				{showErrorMessage && (
					<ErrorMessage searchQuery={this.state.searchQuery} />
				)}

				{images.length !== 0 && (
					<ImageGallery
						images={this.state.images}
						onImageClick={this.onImageClick}
					/>
				)}

				{showLoader && <Loader />}

				{showBtn && !showLoader && <Button loadMore={this.loadMore} />}

				{showModal && (
					<Modal
						onClose={this.toggleModal}
						modalImageURL={this.state.modalImageURL}
					/>
				)}
			</>
		);
	}
}
export default App;
