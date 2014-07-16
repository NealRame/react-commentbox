/** @jsx React.DOM */

// The above declaration must remain intact at the top of the script
// Code goes below

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author}>{comment.text}</Comment>
            )
        });
        return (<div className="commentList">{commentNodes}</div>);
    }
});

var CommentForm = React.createClass({
    // This custom method is called when the `submit` button is clicked.
    handleSubmit: function () {
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();

        if (text && author) {
            this.props.onCommentSubmit({author: author, text: text});
            this.refs.author.getDOMNode().value = '';
            this.refs.text.getDOMNode().value = '';
        }

        return false;
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
});
