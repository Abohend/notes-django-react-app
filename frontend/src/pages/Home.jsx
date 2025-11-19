import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

function Home() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/notes/");
            setNotes(res.data);
            console.log(res.data);
        } catch (e) {
            console.log("error fetching data", e);
        } finally {
            setLoading(false);
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/api/notes/", { content, title });
            if (res.status == 201) {
                setNotes((prev) => [...prev, res.data]);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const deleteNote = async (id) => {
        const res = await api.delete(`/api/notes/delete/${id}/`);
        if (res.status == 204) {
            setNotes((prev) => prev.filter((n) => n.id != id));
        }
    };

    return (
        <>
            <section>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} deleteNote={deleteNote} key={note.id} />
                ))}
            </section>
            <form onSubmit={addNote}>
                <h2>Add a note</h2>
                <label htmlFor="title">Title</label>
                <input
                    required
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <br />
                <label htmlFor="content">Content</label>
                <textarea
                    required
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input
                    type="submit"
                    disabled={!title || !content || loading}
                    value="Add"
                />
            </form>
        </>
    );
}

export default Home;
