import { Link } from "react-router";

export default function Header() {
    return (
        <header>
            <h1>Business Blog</h1>
            <Link to='/'>home</Link>
        </header>
    );
}
