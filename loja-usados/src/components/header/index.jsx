// import { Link } from 'react-router-dom';
import "./index.css"

export const Header = () => {
    return (
        <header>
            <h1>NotNetflix</h1>
            <div className="buttons">
                {/* <Link to="/"> */}
                    <button>Home</button>
                {/* </Link> */}
                {/* <Link to="/new-card"> */}
                    <button>New Card</button>
                {/* </Link> */}
            </div>
        </header>
    )
}