"use strict";

(function () {
	var AppContainer = React.createClass({
		displayName: "AppContainer",

		getInitialState: function getInitialState() {
			return {
				text: '# Sample Markdown Heading\n\nEdit or replace this\n-----------\n\n### Another deeper heading\n\nParagraphs are separated by a blank line.\n\nText attributes *italic*, **bold**,\n`monospace`, ~~strikethrough~~ .\n\nUnordered list:\n\n  * hippies\n  * croissants\n  * the all-seeing eye\n\nOrdered list:\n\n  1. hippies\n  2. croissants\n  3. the all-seeing eye\n\n---\n\n#### Created by:\n[Kostas Tsolkas](https://github.com/tichusp)'
			};
		},
		changeText: function changeText(newText) {
			this.setState({
				text: newText
			});
		},
		render: function render() {
			return React.createElement(App, {
				changeText: this.changeText,
				text: this.state.text
			});
		}
	});

	var App = React.createClass({
		displayName: "App",

		propTypes: {
			changeText: React.PropTypes.func.isRequired,
			text: React.PropTypes.string.isRequired
		},

		render: function render() {
			return React.createElement(
				"div",
				{ className: "container" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-xs-12" },
						React.createElement(
							"h1",
							{ className: "text-center" },
							"GitHub Flavored Markdown Previewer"
						),
						React.createElement("hr", null)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-md-6" },
						React.createElement(
							"h2",
							{ className: "text-center" },
							"Input"
						),
						React.createElement(Textarea, {
							onChange: this.props.changeText,
							text: this.props.text
						})
					),
					React.createElement(
						"div",
						{ className: "col-md-6" },
						React.createElement(
							"h2",
							{ className: "text-center" },
							"Output"
						),
						React.createElement(MarkdownOutput, { text: this.props.text })
					)
				)
			);
		}
	});

	var Textarea = React.createClass({
		displayName: "Textarea",

		propTypes: {
			onChange: React.PropTypes.func.isRequired,
			text: React.PropTypes.string.isRequired
		},

		handleChange: function handleChange(e) {
			var input = e.target.value;
			this.props.onChange(input);
		},

		render: function render() {
			return React.createElement("textarea", {
				onChange: this.handleChange,
				value: this.props.text
			});
		}
	});

	function MarkdownOutput(props) {
		var output = marked(props.text);
		return React.createElement("div", {
			className: "well",
			dangerouslySetInnerHTML: { __html: output }
		});
	}

	MarkdownOutput.propTypes = {
		text: React.PropTypes.string.isRequired
	};

	ReactDOM.render(React.createElement(AppContainer, null), document.getElementById('app'));
})();