export default function Filter({ filterText, onFilter }) {
    return (
        <div className="filter-container">
            <input
                className="filter-input"
                type="text"
                placeholder="Search by name..."
                value={filterText}
                onChange={e => onFilter(e.target.value)}
            />
        </div>
    );
}
