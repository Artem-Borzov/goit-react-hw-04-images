import React, { Component } from 'react';
import { SearchbarHeader } from './Searchbar.styled';
import PropTypes from 'prop-types';
import '../../styles.css';

class Searchbar extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
		searchQuery: '',
	};

	handleQueryChange = event => {
		this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
	};

	handleSubmit = event => {
		event.preventDefault();

		if (this.state.searchQuery.trim() === '') {
			alert('Enter something');
			return;
		}

		this.props.onSubmit(this.state.searchQuery);
		this.setState({ searchQuery: '' });
	};

	render() {
		return (
			<SearchbarHeader>
				<form className="SearchForm" onSubmit={this.handleSubmit}>
					<button type="submit" className="SearchForm-button">
						<span className="SearchForm-button-label">Search</span>
					</button>

					<input
						className="SearchForm-input"
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
						onChange={this.handleQueryChange}
						value={this.state.searchQuery}
					/>
				</form>
			</SearchbarHeader>
		);
	}
}

export default Searchbar;
