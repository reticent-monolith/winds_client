




<Modal
isOpen={this.state.commentModalIsOpen}
onAfterOpen={this.afterOpenCommentModal}
onRequestClose={this.closeCommentModal}
contentLabel="Add a comment"
style={this.styles.commentModal}
>
{/* Comment Input */}
<textarea
    style={this.styles.textArea}
    value={this.state.dispatch.comment}
    placeholder="Add a comment"
    onChange={e => {
        this.setState({
            ...this.state,
            dispatch: {
                ...this.state.dispatch,
                comment: e.target.value
            }
        })
    }}
></textarea>
</Modal>