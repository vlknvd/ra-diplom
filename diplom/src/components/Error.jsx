const Error = ({ error, func }) => {
    return (
        <div className="error">
            <p className="error-text">Ошибка: {error}</p>
            <button className="btn-return" onClick={func}>Попробовать снова</button>
        </div>
    )
}

export default Error