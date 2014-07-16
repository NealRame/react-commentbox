/** @jsx React.DOM */

// The above declaration must remain intact at the top of the script
// Code goes below

var converter = new Showdown.converter();
var Comment = React.createClass({
    render: function () {
        var raw_markup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={{__html: raw_markup}} />
            </div>
        );
    }
});
