function Node({ note, deleteNote }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-EG");
    return (
        <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{formattedDate}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
    );
}

export default Node;
