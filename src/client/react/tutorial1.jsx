/** @jsx React.DOM */

// The above declaration must remain intact at the top of the script
// Code goes below

var CommentBox = React.createClass({
    // This method is executed exactly once during the lifecycle of the
    // component and it is responsible of setting the initial state.
    getInitialState: function () {
        return {data: []};
    },
    // This is a custom method we provide to make a GET request on some JSON
    // from the server and update the state of the component.
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // This custom method will be called to submit a new comment to the server
    // and refresh the comment list
    handleCommentSubmit: function (comment) {
        // Optimistically update the comment list
        this.setState({data: this.state.data.concat([comment])});
        Request the server to store the new comment
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // This method is called automatically by ReactJS before a component is
    // rendered.
    componentWillMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

React.renderComponent(
    <CommentBox url="comments" pollInterval={2000} />,
    document.getElementById('content')
);
