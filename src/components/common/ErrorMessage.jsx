function ErrorMessage({ error, resetState }) {
    const handleCloseClicked = function() {
        resetState();
    }

    return (
        <div className="err-wrapper alert alert-warning alert-dismissible fade show" role="alert" style={{fontFamily: "Jost"}}>
            {error}
            <button onClick={handleCloseClicked} type="button" className="close-btn" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}

export default ErrorMessage;