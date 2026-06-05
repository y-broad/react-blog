import { useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "./useFetch";
import Filter from "./Filter";

export default function Home() {
    const navigate = useNavigate();
    const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
    const [filterText, setFilterText] = useState('');

    if (loading) return <div className="loading">loading...</div>;
    if (error) return <div className="error">Failed to load users: {error}</div>;

    const displayedUsers = filterText
        ? users.filter(u => u.name.toLowerCase().includes(filterText.toLowerCase()))
        : users;

    return (
        <>
            <Filter filterText={filterText} onFilter={setFilterText} />
            {displayedUsers.length === 0
                ? <div className="no-results">No users found.</div>
                : <div className="users">
                    {displayedUsers.map(u => (
                        <div key={u.id} className="user-card" onClick={() => navigate(`/${u.id}`)}>
                            <p className="user-name">{u.name}</p>
                            <p className="user-website">{u.website}</p>
                            <p className="user-company">{u.company.name}</p>
                            <p className="user-catchphrase">{u.company.catchPhrase}</p>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}
