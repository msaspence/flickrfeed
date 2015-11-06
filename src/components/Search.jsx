var React = require('react'),
    Link  = require('react-router/lib/Link');

(function(React, Link, module, undefined) {
  module.exports = React.createClass({

    // Configuration

    getInitialState: function() {
      return {
        inputValue: this.props.searchQuery
      };
    },

    // Lifecycle

    componentWillReceiveProps: function(nextProps) {
      if (this.props.searchQuery != nextProps.searchQuery) {
        this.setState({
          inputValue: nextProps.searchQuery
        });
      }
    },

    render: function() {
      return (
        <div className={this.className()}>
          <input ref='input' className="form-control" placeholder="Search for..." type="search" value={this.state.inputValue} onChange={this.onInputChange} onKeyPress={this.onKeyPress} />
          <a ref='clear' className="clear fa fa-times-circle" onClick={this.onClear}></a>
          <button ref='button' className="btn btn-primary" onClick={this.onButtonClick}>Search</button>
        </div>
      );
    },

    // Derivers

    className: function() {
      r = "search";
      if (!this.state.inputValue || this.state.inputValue === "") r +=' empty';
      return r;
    },

    // Events

    onButtonClick: function() {
      this.props.setSearchQuery(this.state.inputValue);
    },

    onInputChange: function(event) {
      this.setState({ inputValue: event.target.value });
    },

    onKeyPress: function(event) {
      if (event.charCode == 13 ) {
        return this.onButtonClick();
      }
    },

    onClear: function(event) {
      this.setState({ inputValue: "" }, function() {
        this.onButtonClick();
      });
    }

  });
}(React, Link, module));
