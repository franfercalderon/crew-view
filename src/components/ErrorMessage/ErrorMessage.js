export default function ErrorMessage ({title, message}) {
    return(
        <div className="error-main-container">
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    )
}